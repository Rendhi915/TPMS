-- Delete All Alerts Script
-- WARNING: This will permanently delete all alert records!

BEGIN;

-- Count before deletion
SELECT 'Before deletion:' as status, COUNT(*) as total_alerts FROM alert_events;

-- Delete all alert_events
DELETE FROM alert_events;

-- Count after deletion
SELECT 'After deletion:' as status, COUNT(*) as total_alerts FROM alert_events;

-- Reset the sequence (optional - if you want IDs to start from 1 again)
-- ALTER SEQUENCE alert_events_id_seq RESTART WITH 1;

COMMIT;

-- Verify
SELECT 'Verification:' as status, COUNT(*) as total_alerts FROM alert_events;
