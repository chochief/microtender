<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Subcat;

class Cat extends Model
{
    public $timestamps = false;
    protected $fillable = ['name'];

    public function subcats ()
    {
    	return $this->hasMany('App\Subcat');
    }
}
