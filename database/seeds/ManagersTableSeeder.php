<?php

use Illuminate\Database\Seeder;

use App\Manager;

class ManagersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$managers = [];

    	$i = 0;
    	$managers[$i] = Manager::create([
    		'enabled' => 1,
    		'surname' => 'Петров', 
    		'name' => 'Максим', 
    		'middle_name' => 'Сергеевич', 
    		'post' => 'генеральный директор', 
    		'email' => 'maxim.petrov1234@gmail.com', 
    		'phone' => '(555) 555-812', 
    		'mobile' => '75555555555', 
    		'company' => 'Объект',
    		'inn' => '0001200',
    		'address' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam!',
    		'site' => '555812.ru',
    		'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque quidem corrupti possimus culpa facilis cumque aut dolor dolores excepturi sapiente.',
    	]);
    	$managers[$i]->subcats()->sync([1, 3, 5, 8]);
    	$managers[$i]->cities()->sync([1, 5, 9]);

    	$i = 1;
    	$managers[$i] = Manager::create([
    		'enabled' => 1,
    		'surname' => 'Иванова', 
    		'name' => 'Анастасия', 
    		'middle_name' => '', 
    		'post' => 'дизайнер', 
    		'email' => 'anast.ivanova1234@gmail.com', 
    		'phone' => '(555) 555-812', 
    		'mobile' => '', 
    		'company' => 'Объект',
    		'inn' => '0001020',
    		'address' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam!',
    		'site' => '555812.ru',
    		'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque quidem corrupti possimus culpa facilis cumque aut dolor dolores excepturi sapiente.',
    	]);
    	$managers[$i]->subcats()->sync([1, 3]);
    	$managers[$i]->cities()->sync([9]);

    	$i = 2;
    	$managers[$i] = Manager::create([
    		'enabled' => 1,
            'surname' => 'Семенова', 
            'name' => 'Нина', 
            'middle_name' => 'Владимировна', 
            'post' => 'директор', 
            'email' => 'nina.semenova1234@gmail.com', 
            'phone' => '(555) 555-456', 
            'mobile' => '', 
            'company' => 'Дизайн',
            'inn' => '0001031',
            'address' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam!',
            'site' => '',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque quidem corrupti possimus culpa facilis cumque aut dolor dolores excepturi sapiente.',
    	]);
    	$managers[$i]->subcats()->sync([2, 4, 6, 8]);
    	$managers[$i]->cities()->sync([1, 2]);

    	$i = 3;
    	$managers[$i] = Manager::create([
    		'enabled' => 1,
    		'surname' => 'Алексеев', 
    		'name' => 'Марк', 
    		'middle_name' => '', 
    		'post' => 'CEO', 
    		'email' => 'mark.alekseev1224@gmail.com', 
    		'phone' => '555-55-55', 
    		'mobile' => '', 
      		'company' => 'mark corp',
			'inn' => '00012202',
			'address' => 'California',
			'site' => 'mark12345.com',
			'description' => 'Social1234',
    	]);
    	$managers[$i]->subcats()->sync([1, 2, 3, 4, 5, 6, 7, 8]);
    	$managers[$i]->cities()->sync([1, 2, 3, 4, 5, 6, 7, 8]);

    }
}
