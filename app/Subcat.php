<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Cat;
use App\Provider;

class Subcat extends Model
{
    public $timestamps = false;
    protected $fillable = ['cat_id', 'name', 'enabled'];
    protected $hidden = [];

    public function cat ()
    {
    	return $this->belongsTo('App\Cat');
    }

    public function providers ()
    {
    	return $this->belongsToMany('App\Provider');
    }

}
