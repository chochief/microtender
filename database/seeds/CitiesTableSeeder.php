<?php

use Illuminate\Database\Seeder;

use App\City;
use App\District;

class CitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	// !!! чтобы id не путались, добавлять distict и city можно только в конец !!!

    	$districts = [];
    	$cities = [];

    	$i = 0;
		$districts[$i] = District::create(['name' => 'Центральный ФО']);
        $cities[$i] = [
        	new City(['name' => 'Ярославль', 'enabled' => 1]),
        	new City(['name' => 'Москва', 'enabled' => 0]),
			new City(['name' => 'Белгород', 'enabled' => 0]),
			new City(['name' => 'Брянск', 'enabled' => 0]),
			new City(['name' => 'Владимир', 'enabled' => 0]),
			new City(['name' => 'Воронеж', 'enabled' => 0]),
			new City(['name' => 'Иваново', 'enabled' => 0]),
			new City(['name' => 'Калуга', 'enabled' => 0]),
			new City(['name' => 'Кострома', 'enabled' => 0]),
			new City(['name' => 'Курск', 'enabled' => 0]),
			new City(['name' => 'Липецк', 'enabled' => 0]),
			new City(['name' => 'Орел', 'enabled' => 0]),
			new City(['name' => 'Рязань', 'enabled' => 0]),
			new City(['name' => 'Смоленск', 'enabled' => 0]),
			new City(['name' => 'Тамбов', 'enabled' => 0]),
			new City(['name' => 'Тверь', 'enabled' => 0]),
			new City(['name' => 'Тула', 'enabled' => 0]),
        ];
        $districts[$i]->cities()->saveMany($cities[$i]);    

    	$i = 1;
		$districts[$i] = District::create(['name' => 'Северо-Западный ФО']);
        $cities[$i] = [
			new City(['name' => 'Петрозаводск', 'enabled' => 0]),
			new City(['name' => 'Сыктывкар', 'enabled' => 0]),
			new City(['name' => 'Архангельск', 'enabled' => 0]),
			new City(['name' => 'Вологда', 'enabled' => 0]),
			new City(['name' => 'Калининград', 'enabled' => 0]),
			new City(['name' => 'Санкт-Петербург', 'enabled' => 0]),
			new City(['name' => 'Мурманск', 'enabled' => 0]),
			new City(['name' => 'Великий Новгород', 'enabled' => 0]),
			new City(['name' => 'Псков', 'enabled' => 0]),
			new City(['name' => 'Нарьян-Мар', 'enabled' => 0]),
        ];
        $districts[$i]->cities()->saveMany($cities[$i]);    

    	$i = 2;
		$districts[$i] = District::create(['name' => 'Южный ФО']);
        $cities[$i] = [
        	new City(['name' => 'Майкоп', 'enabled' => 0]),
        	new City(['name' => 'Элиста', 'enabled' => 0]),
        	new City(['name' => 'Краснодар', 'enabled' => 0]),
        	new City(['name' => 'Симферополь', 'enabled' => 0]),
        	new City(['name' => 'Астрахань', 'enabled' => 0]),
        	new City(['name' => 'Волгоград', 'enabled' => 0]),
        	new City(['name' => 'Ростов-на-Дону', 'enabled' => 0]),
        	new City(['name' => 'Севастополь', 'enabled' => 0]),
        ];
        $districts[$i]->cities()->saveMany($cities[$i]);    

    	$i = 3;
		$districts[$i] = District::create(['name' => 'Северо-Кавказский ФО']);
        $cities[$i] = [
        	new City(['name' => 'Махачкала', 'enabled' => 0]),
        	new City(['name' => 'Магас', 'enabled' => 0]),
        	new City(['name' => 'Нальчик', 'enabled' => 0]),
        	new City(['name' => 'Черкесск', 'enabled' => 0]),
        	new City(['name' => 'Владикавказ', 'enabled' => 0]),
        	new City(['name' => 'Грозный', 'enabled' => 0]),
        	new City(['name' => 'Ставрополь', 'enabled' => 0]),
        ];
        $districts[$i]->cities()->saveMany($cities[$i]);    

    	$i = 4;
		$districts[$i] = District::create(['name' => 'Приволжский ФО']);
        $cities[$i] = [
        	new City(['name' => 'Уфа', 'enabled' => 0]),
        	new City(['name' => 'Йошкар-Ола', 'enabled' => 0]),
        	new City(['name' => 'Саранск', 'enabled' => 0]),
        	new City(['name' => 'Казань', 'enabled' => 0]),
        	new City(['name' => 'Ижевск', 'enabled' => 0]),
        	new City(['name' => 'Чебоксары', 'enabled' => 0]),
        	new City(['name' => 'Киров', 'enabled' => 0]),
        	new City(['name' => 'Нижний Новгород', 'enabled' => 0]),
        	new City(['name' => 'Оренбург', 'enabled' => 0]),
        	new City(['name' => 'Пенза', 'enabled' => 0]),
        	new City(['name' => 'Самара', 'enabled' => 0]),
        	new City(['name' => 'Саратов', 'enabled' => 0]),
        	new City(['name' => 'Ульяновск', 'enabled' => 0]),
        	new City(['name' => 'Пермь', 'enabled' => 0]),
        ];
        $districts[$i]->cities()->saveMany($cities[$i]);    

    	$i = 5;
		$districts[$i] = District::create(['name' => 'Уральский ФО']);
        $cities[$i] = [
        	new City(['name' => 'Курган', 'enabled' => 0]),
        	new City(['name' => 'Екатеринбург', 'enabled' => 0]),
        	new City(['name' => 'Тюмень', 'enabled' => 0]),
        	new City(['name' => 'Челябинск', 'enabled' => 0]),
        	new City(['name' => 'Ханты-Мансийск', 'enabled' => 0]),
        	new City(['name' => 'Салехард', 'enabled' => 0]),
        ];
        $districts[$i]->cities()->saveMany($cities[$i]);    

    	$i = 6;
		$districts[$i] = District::create(['name' => 'Сибирский ФО']);
        $cities[$i] = [
        	new City(['name' => 'Горно-Алтайск', 'enabled' => 0]),
        	new City(['name' => 'Улан-Удэ', 'enabled' => 0]),
        	new City(['name' => 'Кызыл', 'enabled' => 0]),
        	new City(['name' => 'Абакан', 'enabled' => 0]),
        	new City(['name' => 'Барнаул', 'enabled' => 0]),
        	new City(['name' => 'Чита', 'enabled' => 0]),
        	new City(['name' => 'Красноярск', 'enabled' => 0]),
        	new City(['name' => 'Иркутск', 'enabled' => 0]),
        	new City(['name' => 'Кемерово', 'enabled' => 0]),
        	new City(['name' => 'Новосибирск', 'enabled' => 0]),
        	new City(['name' => 'Омск', 'enabled' => 0]),
        	new City(['name' => 'Томск', 'enabled' => 0]),
        ];
        $districts[$i]->cities()->saveMany($cities[$i]);    

    	$i = 7;
		$districts[$i] = District::create(['name' => 'Дальневосточный ФО']);
        $cities[$i] = [
        	new City(['name' => 'Якутск', 'enabled' => 0]),
        	new City(['name' => 'Петропавловск-Камчатский', 'enabled' => 0]),
        	new City(['name' => 'Владивосток', 'enabled' => 0]),
        	new City(['name' => 'Хабаровск', 'enabled' => 0]),
        	new City(['name' => 'Благовещенск', 'enabled' => 0]),
        	new City(['name' => 'Магадан', 'enabled' => 0]),
        	new City(['name' => 'Южно-Сахалинск', 'enabled' => 0]),
        	new City(['name' => 'Биробиджан', 'enabled' => 0]),
        	new City(['name' => 'Анадырь', 'enabled' => 0]),
        ];
        $districts[$i]->cities()->saveMany($cities[$i]);    

    }
}
