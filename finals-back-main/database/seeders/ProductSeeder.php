<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('products')->insert([
            [
                'name'=>"LG Mobile",
                'price'=>"10000",
                'description'=>"A smartphone with 4gb ram",
                'category'=>'Mobile & Computer',
                'gallery'=>'https://www.lg.com'
            ],
            [
                'name'=>"Oppo",
                'price'=>"12000",
                'description'=>"A smartphone with 6gb ram",
                'category'=>'Mobile & Computer',
                "gallery"=>'https://www.oppo.com'
            ],
            [
                'name'=>"samsung",
                'price'=>"10000",
                'description'=>"4k oled android tv",
                'category'=>'Home Applience',
                "gallery"=>'https://www.samsung.com'
            ]
        ]);
    }
}
