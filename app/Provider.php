<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use DB;
use App\Manager;

class Provider extends Model
{
    protected $fillable = ['inn', 'company', 'address', 'site', 'description'];
    protected $hidden = ['enabled'];

    public function managers ()
    {
    	return $this->hasMany('App\Manager');
    }

}
