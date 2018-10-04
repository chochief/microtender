<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateManagersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('managers', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('provider_id')->index()->nullable();
            $table->boolean('enabled')->default(0);
            $table->string('surname');
            $table->string('name');
            $table->string('middle_name')->nullable();
            $table->string('post');
            $table->string('email');
            $table->string('phone');
            $table->string('mobile')->nullable();
            $table->string('company');
            $table->string('inn')->nullable();
            $table->string('address')->nullable();
            $table->string('site')->nullable();
            $table->text('description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('managers');
    }
}
