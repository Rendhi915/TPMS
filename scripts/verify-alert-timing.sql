-- Verify Alert Frequency per Truck
-- Check interval between alerts for each truck

SELECT 
  t.plate,
  t.name,
  ae.id as alert_id,
  ae.created_at,
  LAG(ae.created_at) OVER (PARTITION BY ae.truck_id ORDER BY ae.created_at) as prev_alert_time,
  EXTRACT(EPOCH FROM (
    ae.created_at - LAG(ae.created_at) OVER (PARTITION BY ae.truck_id ORDER BY ae.created_at)
  ))/60 as minutes_since_prev_alert,
  a.code as alert_code,
  ae.message
FROM alert_events ae
JOIN truck t ON ae.truck_id = t.id
JOIN alert a ON ae.alert_id = a.id
WHERE 
  ae.created_at > NOW() - INTERVAL '2 hours'
  AND t.plate LIKE 'B 900% SIM'
ORDER BY t.plate, ae.created_at DESC
LIMIT 50;
