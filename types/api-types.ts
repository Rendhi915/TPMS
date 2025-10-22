/**
 * TypeScript Type Definitions for TPMS Backend API
 * Version: 2.0.0
 * Last Updated: 2024-10-22
 */

// ============================================================================
// Authentication Types
// ============================================================================

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: true;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// Truck Types
// ============================================================================

export interface Truck {
  id: number;
  truck_id: string;
  license_plate: string;
  brand?: string;
  model?: string;
  year?: number;
  status: 'operational' | 'maintenance' | 'offline';
  vendorId?: number;
  driverId?: number;
  deviceId?: number;
  vendor?: Vendor;
  driver?: Driver;
  device?: Device;
  sensorData?: SensorData;
  alerts?: Alert[];
  lastUpdate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTruckRequest {
  truck_id: string;
  license_plate: string;
  brand?: string;
  model?: string;
  year?: number;
  vendorId?: number;
  driverId?: number;
  status?: 'operational' | 'maintenance' | 'offline';
}

export interface UpdateTruckRequest {
  truck_id?: string;
  license_plate?: string;
  brand?: string;
  model?: string;
  year?: number;
  vendorId?: number;
  driverId?: number;
  status?: 'operational' | 'maintenance' | 'offline';
  notes?: string;
}

export interface TruckListResponse {
  success: true;
  data: {
    trucks: Truck[];
    pagination: Pagination;
  };
}

export interface TruckDetailResponse {
  success: true;
  data: Truck;
}

// ============================================================================
// Driver Types
// ============================================================================

export interface Driver {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  licenseNumber: string;
  licenseType: string;
  licenseExpiry: string;
  idCardNumber: string;
  vendorId?: number;
  status: 'aktif' | 'tidak_aktif';
  vendor?: Vendor;
  assignedTruck?: Truck;
  currentTruck?: Truck;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDriverRequest {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  licenseNumber: string;
  licenseType: string;
  licenseExpiry: string;
  idCardNumber: string;
  vendorId?: number;
  status?: 'aktif' | 'tidak_aktif';
}

export interface UpdateDriverRequest {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  licenseNumber?: string;
  licenseType?: string;
  licenseExpiry?: string;
  idCardNumber?: string;
  vendorId?: number;
  status?: 'aktif' | 'tidak_aktif';
}

export interface DriverListResponse {
  success: true;
  data: {
    drivers: Driver[];
    pagination: Pagination;
  };
}

export interface DriverDetailResponse {
  success: true;
  data: Driver;
}

// ============================================================================
// Vendor Types
// ============================================================================

export interface Vendor {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  contactPerson?: string;
  trucks?: Truck[];
  drivers?: Driver[];
  truckCount?: number;
  driverCount?: number;
  statistics?: {
    totalTrucks: number;
    activeTrucks: number;
    totalDrivers: number;
    activeDrivers: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateVendorRequest {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  contactPerson?: string;
}

export interface UpdateVendorRequest {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  contactPerson?: string;
}

export interface VendorListResponse {
  success: true;
  data: {
    vendors: Vendor[];
    pagination: Pagination;
  };
}

export interface VendorDetailResponse {
  success: true;
  data: Vendor;
}

// ============================================================================
// Sensor Data Types
// ============================================================================

export interface TireData {
  pressure: number;
  temperature: number;
  status: 'normal' | 'warning' | 'critical';
  batteryLevel?: number;
}

export interface SensorData {
  frontLeft: TireData;
  frontRight: TireData;
  rearLeft: TireData;
  rearRight: TireData;
}

export interface SensorDataPoint {
  timestamp: string;
  frontLeft: { pressure: number; temperature: number };
  frontRight: { pressure: number; temperature: number };
  rearLeft: { pressure: number; temperature: number };
  rearRight: { pressure: number; temperature: number };
}

export interface SensorHistoryResponse {
  success: true;
  data: {
    truckId: number;
    period: {
      start: string;
      end: string;
    };
    dataPoints: SensorDataPoint[];
    statistics: {
      avgPressure: number;
      maxPressure: number;
      minPressure: number;
      avgTemperature: number;
    };
  };
}

export interface LatestSensorDataResponse {
  success: true;
  data: {
    truckId: number;
    truck_id: string;
    timestamp: string;
    tires: SensorData;
    overall: {
      avgPressure: number;
      avgTemperature: number;
      healthStatus: 'good' | 'warning' | 'critical';
      alertCount: number;
    };
  };
}

// ============================================================================
// Alert Types
// ============================================================================

export interface Alert {
  id: number;
  truck?: {
    id: number;
    truck_id: string;
  };
  truckId?: number;
  truck_id?: string;
  type:
    | 'low_pressure'
    | 'high_pressure'
    | 'high_temperature'
    | 'battery_low'
    | 'sensor_malfunction';
  severity: 'critical' | 'warning' | 'info';
  status: 'active' | 'acknowledged' | 'resolved';
  message: string;
  wheelPosition?: 'front_left' | 'front_right' | 'rear_left' | 'rear_right';
  currentValue?: number;
  threshold?: number;
  timestamp: string;
  acknowledgedAt?: string | null;
  acknowledgedBy?: string | null;
  resolvedAt?: string | null;
  resolution?: string;
  actionTaken?: string;
}

export interface AlertListResponse {
  success: true;
  data: {
    alerts: Alert[];
    pagination: Pagination;
    summary?: {
      critical: number;
      warning: number;
      info: number;
    };
  };
}

export interface AcknowledgeAlertRequest {
  notes?: string;
}

export interface ResolveAlertRequest {
  resolution: string;
  actionTaken?: string;
}

// ============================================================================
// Device Types
// ============================================================================

export interface Device {
  id: number;
  device_id: string;
  status: 'active' | 'inactive' | 'maintenance';
  assignedTruck?: {
    id: number;
    truck_id: string;
  };
  batteryLevel?: number;
  lastPing?: string;
  firmwareVersion?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DeviceListResponse {
  success: true;
  data: {
    devices: Device[];
    pagination: Pagination;
  };
}

// ============================================================================
// Dashboard Types
// ============================================================================

export interface DashboardStats {
  totalTrucks: number;
  activeTrucks: number;
  totalAlerts: number;
  criticalAlerts: number;
  averagePressure: number;
  totalDrivers: number;
  totalVendors: number;
}

export interface DashboardStatsResponse {
  success: true;
  data: DashboardStats;
}

export interface TruckStatusSummary {
  operational: number;
  maintenance: number;
  offline: number;
  totalTrucks: number;
}

export interface AlertSummary {
  critical: number;
  warning: number;
  info: number;
  total: number;
  last24Hours: number;
}

// ============================================================================
// WebSocket Types
// ============================================================================

export interface WebSocketMessage {
  type: 'sensor_update' | 'alert' | 'truck_status' | 'admin_activity';
  timestamp: string;
  payload: any;
}

export interface SensorUpdateMessage {
  type: 'sensor_update';
  timestamp: string;
  payload: {
    truckId: number;
    truck_id: string;
    sensors: SensorData;
  };
}

export interface AlertMessage {
  type: 'alert';
  timestamp: string;
  payload: Alert;
}

export interface TruckStatusMessage {
  type: 'truck_status';
  timestamp: string;
  payload: {
    truckId: number;
    truck_id: string;
    oldStatus: string;
    newStatus: string;
    reason?: string;
  };
}

export interface AdminActivityMessage {
  type: 'admin_activity';
  timestamp: string;
  payload: {
    action: string;
    admin: {
      id: string;
      username: string;
    };
    details: any;
  };
}

// ============================================================================
// Common Types
// ============================================================================

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
  errors?: ValidationError[];
}

// ============================================================================
// Query Parameters Types
// ============================================================================

export interface TruckQueryParams {
  page?: number;
  limit?: number;
  status?: 'operational' | 'maintenance' | 'offline';
  search?: string;
  vendorId?: number;
  sortBy?: 'truck_id' | 'status' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}

export interface DriverQueryParams {
  page?: number;
  limit?: number;
  status?: 'aktif' | 'tidak_aktif';
  vendorId?: number;
  search?: string;
}

export interface VendorQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface AlertQueryParams {
  page?: number;
  limit?: number;
  severity?: 'critical' | 'warning' | 'info';
  status?: 'active' | 'acknowledged' | 'resolved';
  truckId?: number;
  startDate?: string;
  endDate?: string;
}

export interface SensorHistoryParams {
  startDate: string;
  endDate: string;
  interval?: '5m' | '15m' | '1h' | '6h' | '1d';
  wheelPosition?: 'front_left' | 'front_right' | 'rear_left' | 'rear_right';
}

// ============================================================================
// API Client Configuration
// ============================================================================

export interface ApiConfig {
  baseURL: string;
  wsURL: string;
  timeout: number;
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
}

// ============================================================================
// Helper Types
// ============================================================================

export type WheelPosition = 'front_left' | 'front_right' | 'rear_left' | 'rear_right';
export type TruckStatus = 'operational' | 'maintenance' | 'offline';
export type DriverStatus = 'aktif' | 'tidak_aktif';
export type DeviceStatus = 'active' | 'inactive' | 'maintenance';
export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved';
export type UserRole = 'admin' | 'operator' | 'viewer';
