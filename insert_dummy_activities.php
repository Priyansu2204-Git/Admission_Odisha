<?php
require __DIR__ . '/backend/vendor/autoload.php';
require __DIR__ . '/backend/vendor/yiisoft/yii2/Yii.php';

$config = require __DIR__ . '/backend/config/web.php';
new yii\web\Application($config);

// 1. Add ip_address column if it doesn't exist
$db = Yii::$app->db;
try {
    $db->createCommand("ALTER TABLE `user_activity` ADD `ip_address` VARCHAR(45) NULL DEFAULT NULL AFTER `activity_type`")->execute();
    echo "Added ip_address column.\n";
} catch (\Exception $e) {
    echo "Column ip_address might already exist: " . $e->getMessage() . "\n";
}

// 2. Insert Dummy Data
// First, let's get some user IDs
$users = $db->createCommand("SELECT id FROM users LIMIT 5")->queryColumn();
if (empty($users)) {
    // Insert a dummy user if none exists
    $db->createCommand()->insert('users', [
        'name' => 'Demo User',
        'email' => 'demo@example.com',
        'created_at' => date('Y-m-d H:i:s'),
        'is_status' => 1
    ])->execute();
    $users[] = $db->getLastInsertID();
}

$activities = [
    ['activity_type' => 'Login', 'ip_address' => '192.168.1.1'],
    ['activity_type' => 'Login', 'ip_address' => '192.168.1.8'],
    ['activity_type' => 'Added to Wishlist', 'ip_address' => '192.168.1.5'],
    ['activity_type' => 'Viewed College', 'ip_address' => '192.168.1.3'],
    ['activity_type' => 'Submitted Enquiry', 'ip_address' => '192.168.1.6'],
    ['activity_type' => 'Profile Updated', 'ip_address' => '192.168.1.2'],
    ['activity_type' => 'Viewed Course', 'ip_address' => '192.168.1.7'],
    ['activity_type' => 'Removed from Wishlist', 'ip_address' => '192.168.1.9'],
    ['activity_type' => 'Login', 'ip_address' => '10.0.0.1'],
    ['activity_type' => 'Submitted Enquiry', 'ip_address' => '10.0.0.2'],
    ['activity_type' => 'Viewed Course', 'ip_address' => '172.16.0.5'],
    ['activity_type' => 'Viewed College', 'ip_address' => '172.16.0.8'],
];

$insertedCount = 0;
foreach ($activities as $act) {
    $userId = $users[array_rand($users)];
    
    // Assign random field_id, course_id, or none based on activity type to make it realistic
    $field_id = null;
    $course_id = null;
    $specialization_id = null;
    
    if (in_array($act['activity_type'], ['Viewed Course', 'Viewed College', 'Added to Wishlist'])) {
        $course_id = rand(1, 5); // Assuming some courses exist
        $field_id = rand(1, 3);
    }

    $db->createCommand()->insert('user_activity', [
        'user_id' => $userId,
        'field_id' => $field_id,
        'specialization_id' => $specialization_id,
        'course_id' => $course_id,
        'activity_type' => $act['activity_type'],
        'ip_address' => $act['ip_address'],
        'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(0, 100) . ' hours'))
    ])->execute();
    $insertedCount++;
}

echo "Inserted $insertedCount dummy activity records.\n";

// Generate SQL dump for these insertions to output so I can add them to admission_odisha.sql
$sqlDump = "INSERT INTO `user_activity` (`user_id`, `field_id`, `specialization_id`, `course_id`, `activity_type`, `ip_address`, `created_at`) VALUES \n";
$values = [];
foreach ($activities as $act) {
    $userId = $users[array_rand($users)];
    $field_id = in_array($act['activity_type'], ['Viewed Course', 'Viewed College', 'Added to Wishlist']) ? rand(1, 3) : 'NULL';
    $course_id = in_array($act['activity_type'], ['Viewed Course', 'Viewed College', 'Added to Wishlist']) ? rand(1, 5) : 'NULL';
    $date = date('Y-m-d H:i:s', strtotime('-' . rand(0, 100) . ' hours'));
    $values[] = "($userId, $field_id, NULL, $course_id, '{$act['activity_type']}', '{$act['ip_address']}', '$date')";
}
$sqlDump .= implode(",\n", $values) . ";\n";
file_put_contents(__DIR__ . '/dummy_activity.sql', $sqlDump);
echo "Dumped to dummy_activity.sql.\n";
