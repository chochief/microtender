<?php

use Illuminate\Database\Seeder;

use App\Cat;
use App\Subcat;

class SubcatsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	// !!! чтобы id не путались, добавлять cat и subcat можно только в конец !!!

    	$cats = [];
    	$subcats = [];

    	$i = 0;
		$cats[$i] = Cat::create(['name' => 'Реклама']);
        $subcats[$i] = [
        	new Subcat(['name' => 'Рекламное агентство полного цикла']),
        	new Subcat(['name' => 'Производство рекламных конструкций']),
        	new Subcat(['name' => 'Широкоформатная и интерьерная печать']),
        	new Subcat(['name' => 'Оперативная полиграфия']),
            new Subcat(['name' => 'Офсетная  полиграфия']),
            new Subcat(['name' => 'Сувенирная продукция']),
            new Subcat(['name' => 'Разработка и продвижение сайтов']),
            new Subcat(['name' => 'Промоакции']),
        	new Subcat(['name' => 'Аренда рекламных мест']),
        ];
        $cats[$i]->subcats()->saveMany($subcats[$i]);    

    	$i = 1;
		$cats[$i] = Cat::create(['name' => 'Строительство']);
        $subcats[$i] = [
        	new Subcat(['name' => 'Агентства недвижимости']),
        	new Subcat(['name' => 'Монтаж климатических систем']),
        	new Subcat(['name' => 'Остекление балконов и лоджий']),
        ];
        $cats[$i]->subcats()->saveMany($subcats[$i]);    

    }
}
