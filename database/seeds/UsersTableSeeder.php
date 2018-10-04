<?php

use Illuminate\Database\Seeder;

use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@microtender.ru',
            'password' => bcrypt('qwer555'),
            // 'api_token' => str_random(60),
            'api_token' => '6xdSYlUDfYEZuyZF3rKhFJJoNKeSSgLK7Mi54es7iK0pcrrQrQjVwrOYPLYW',
            'remember_token' => str_random(10),
        ]);
    }
}
