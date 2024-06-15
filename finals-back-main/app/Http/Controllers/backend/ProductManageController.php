<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;

class ProductManageController extends Controller
{
    function index()
    {
        $data= User::all();
        return view('backend/pages/dashboard', compact('data'));
    }

    function delUser(Request $req)
    {
        User::destroy($req->id);
        $req->session()->put('status','User deleted successfully.');
        return redirect()->route('dashboard');
    }

    function orderList()
    {
        $data= Order::join('products','orders.product_id','=','products.id')
        ->join('users','orders.user_id','=','users.id')
        ->select(['users.name As uname','products.name As pname','products.price As pprice','products.gallery As pgallery','orders.*'])
        ->get();
        return view('backend/pages/order_list', compact('data'));
    }
    function orderStatusChange(Request $req)
    {
        $order=Order::find($req->id);
        $order->status=$req->status;
        $order->save();
        return redirect()->route('order')
        ->with('state','Order status change successfully');
    }
    function productList()
    {
        $data= Product::all();
        return view('backend/pages/product_list', compact('data'));
    }
    function addProduct(Request $req)
    {
        $product = new Product;
        $product->name=$req->name;
        $product->price=$req->price;
        $product->category=$req->category;
        $product->description=$req->description;
        $uploadFile = $req->file('gallery');
        $file_name = $uploadFile->hashName();
        $product->gallery = $file_name;
        
        if ($product->save()) {
            $uploadFile->storeAs('public/gallery', $file_name);
            $req->session()->put('status','Product add successfully.');
            return redirect('/admin/productlist');
        }else {
            $req->session()->put('status','Fail to add product.');
            return redirect('/admin/addproduct');
        }
    }

    function delProduct(Request $req)
    {
        $product=Product::find($req->id);
        Storage::delete('/public/gallery/'.$product->gallery);
        $product->delete();
        $req->session()->put('status','Product remove successfully.');
        return redirect('/admin/productlist');
    }

    function editProduct($id)
    {
        $data= Product::find($id);
        return view('backend/pages/edit_product', compact('data'));
    }

    function updateProduct(Request $req)
    {
        $id=$req->id;
        $product = Product::find($id);
        $product->name=$req->name;
        $product->price=$req->price;
        $product->category=$req->category;
        $product->description=$req->description;
        $uploadFile = $req->file('gallery');
        
        if (!is_null($uploadFile)) {
            $file_name = $uploadFile->hashName();
            $product->gallery = $file_name;
            if ($product->save()) {
                $uploadFile->storeAs('public/gallery', $file_name);
                $req->session()->put('status','Product update successfull.');
                return redirect('/admin/productlist');
            }else {
                $req->session()->put('status','Fail to update product.');
                return redirect('/admin/editproduct/{$id}');
            }
        }else {
            $product->gallery = $req->oldgallery;
            if ($product->save()) {
                $req->session()->put('status','Product update successfull.');
                return redirect('/admin/productlist');
            }else {
                $req->session()->put('status','Fail to update product.');
                return redirect('/admin/editproduct/{$id}');
            }
        }
        
    }
}
