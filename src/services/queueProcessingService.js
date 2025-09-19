const pool = require('../config/database');
// const { broadcastSensorUpdate } = require('./websocketService'); // Unused import

// ==========================================
// ASYNC SENSOR QUEUE PROCESSING SERVICE
// ==========================================

class QueueProcessingService {
  constructor() {
    this.isProcessing = false;
    this.processingInterval = null;
    this.batchSize = 100;
    this.processingIntervalMs = 1000; // Process every second
  }

  // Start the background queue processing
  start() {
    if (this.processingInterval) {
      console.log('⚡ Queue processing already running');
      return;
    }

    console.log('🚀 Starting async sensor queue processing...');
    this.processingInterval = setInterval(async () => {
      if (!this.isProcessing) {
        await this.processQueueBatch();
      }
    }, this.processingIntervalMs);

    console.log(
      `⚡ Queue processing started - batch size: ${this.batchSize}, interval: ${this.processingIntervalMs}ms`
    );
  }

  // Stop the background queue processing
  stop() {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
      console.log('⏹️ Queue processing stopped');
    }
  }

  // Process a batch of sensor data from the queue
  async processQueueBatch() {
    if (this.isProcessing) return;

    this.isProcessing = true;
    const startTime = Date.now();

    try {
      // Call the database function to process queue batch
      const result = await pool.query('SELECT * FROM process_sensor_queue_batch($1)', [
        this.batchSize,
      ]);
      const processResult = result.rows[0];

      if (processResult && processResult.processed_count > 0) {
        const processingTime = Date.now() - startTime;
        console.log(
          `⚡ Processed ${processResult.processed_count} sensor items in ${processingTime}ms`
        );

        // Log performance metrics
        if (processResult.error_count > 0) {
          console.warn(`⚠️ ${processResult.error_count} items failed processing`);
        }
      }

      return processResult;
    } catch (error) {
      console.error('❌ Error processing sensor queue batch:', error);
      return { processed_count: 0, error_count: 1 };
    } finally {
      this.isProcessing = false;
    }
  }

  // Get current queue statistics
  async getQueueStats() {
    try {
      const statsQuery = `
        SELECT 
          COUNT(*) as total_items,
          COUNT(*) FILTER (WHERE processed = false) as pending_items,
          COUNT(*) FILTER (WHERE processed = true) as processed_items,
          COUNT(*) FILTER (WHERE cmd_type = 'device') as gps_items,
          COUNT(*) FILTER (WHERE cmd_type = 'tpdata') as tire_pressure_items,
          COUNT(*) FILTER (WHERE cmd_type = 'hubdata') as hub_temp_items,
          COUNT(*) FILTER (WHERE cmd_type = 'state') as lock_state_items,
          MIN(received_at) FILTER (WHERE processed = false) as oldest_pending,
          MAX(received_at) as newest_item
        FROM sensor_data_raw
        WHERE received_at >= NOW() - INTERVAL '24 hours'
      `;

      const result = await pool.query(statsQuery);
      return result.rows[0];
    } catch (error) {
      console.error('❌ Error getting queue stats:', error);
      return null;
    }
  }

  // Manual queue processing trigger
  async processQueueManually(customBatchSize = null) {
    const batchSize = customBatchSize || this.batchSize;

    try {
      console.log(`🔄 Manual queue processing triggered - batch size: ${batchSize}`);
      const result = await pool.query('SELECT * FROM process_sensor_queue_batch($1)', [batchSize]);
      const processResult = result.rows[0];

      console.log(
        `✅ Manual processing completed: ${processResult.processed_count} items processed`
      );
      return processResult;
    } catch (error) {
      console.error('❌ Error in manual queue processing:', error);
      throw error;
    }
  }

  // Set processing configuration
  setConfig(config) {
    if (config.batchSize && config.batchSize > 0 && config.batchSize <= 1000) {
      this.batchSize = config.batchSize;
      console.log(`⚙️ Batch size updated to: ${this.batchSize}`);
    }

    if (config.intervalMs && config.intervalMs >= 500) {
      this.processingIntervalMs = config.intervalMs;

      // Restart with new interval if running
      if (this.processingInterval) {
        this.stop();
        this.start();
      }

      console.log(`⚙️ Processing interval updated to: ${this.processingIntervalMs}ms`);
    }
  }

  // Get processing status
  getStatus() {
    return {
      isRunning: !!this.processingInterval,
      isProcessing: this.isProcessing,
      batchSize: this.batchSize,
      intervalMs: this.processingIntervalMs,
    };
  }

  // Health check for the queue processing service
  async healthCheck() {
    try {
      const stats = await this.getQueueStats();
      const status = this.getStatus();

      const health = {
        service: 'queue_processing',
        status: status.isRunning ? 'running' : 'stopped',
        isHealthy: true,
        details: {
          ...status,
          queueStats: stats,
        },
      };

      // Check if queue is backing up (more than 1000 pending items)
      if (stats && stats.pending_items > 1000) {
        health.isHealthy = false;
        health.warning = `Queue backlog: ${stats.pending_items} pending items`;
      }

      return health;
    } catch (error) {
      return {
        service: 'queue_processing',
        status: 'error',
        isHealthy: false,
        error: error.message,
      };
    }
  }
}

// Create singleton instance
const queueProcessingService = new QueueProcessingService();

// ==========================================
// STARTUP AND SHUTDOWN HANDLERS
// ==========================================

// Auto-start queue processing when service is imported
setTimeout(() => {
  queueProcessingService.start();
}, 2000); // Start after 2 seconds to allow database connection

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 Shutting down queue processing service...');
  queueProcessingService.stop();
});

process.on('SIGINT', () => {
  console.log('📴 Shutting down queue processing service...');
  queueProcessingService.stop();
});

module.exports = queueProcessingService;
