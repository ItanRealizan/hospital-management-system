<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Support\Facades\Session;

class ProductController extends Controller
{
    function index()
    {
        $data= Product::all();
        // print_r(compact('data'));
        return $data;
    }
    function detail($id)
    {
        $data= Product::find($id);
        // return view('pages/detail', ['product'=>$data]);
        return $data;
    }
    function search($query)
    {
        $data=Product::where('name', 'like', '%'.$query.'%')->get();
        // return view('pages/search', compact('data','query'));
        return $data;
    }
    function addToCart(Request $req)
    {
        if ($req->userId) {

            $user_id = $req->userId;
            $product_id = $req->productId;
            $qty = $req->qty;

            $cart = Cart::updateOrCreate(
                ['user_id' => $user_id, 'product_id' => $product_id],
                ['qty' => $qty]
            );
            // $cart = new Cart;
            // $cart->user_id = $req->session()->get('user')['id'];
            // $cart->product_id = $req->product_id;
            // $cart->save();
            return $cart;
        }
        else {
            return response([
                'error'=>['fail to cart']
            ]);
        }
    }
    function cartItem($id)
    {
        $user_id = $id;
        return Cart::where('user_id',$user_id)->sum('qty');
    }
    function cartList($id)
    {
        if ($id) {
            $user_id=$id;
            $data=Cart::join('products','cart.product_id','=','products.id')
                        ->select('products.*','cart.id As cart_id','cart.qty')
                        ->where('cart.user_id',$user_id)
                        ->get();
            return $data;
        }
        else 
        {
            return view('pages/login');
        }
    }
    function removeCart($id)
    {
        $res=Cart::destroy($id);
        return $res;
    }
    function checkOut($id)
    {
        $user_id=$id;
        $data=Cart::join('products','cart.product_id','=','products.id')
                    ->where('cart.user_id','=', $user_id)
                    ->select('products.*','cart.id As cart_id','cart.qty')
                    ->get();
                    // dd($total);
        return $data;
    }

    function orderPlace(Request $req)
    {
        $user_id=$req->userId;
        $all_cart=Cart::where('user_id',$user_id)->get();
        foreach ($all_cart as $cart) {
            $order=new Order;
            $order->product_id=$cart->product_id;
            $order->user_id=$cart->user_id;
            $order->qty=$cart->qty;
            $order->address=$req->address;
            $order->status="pending";
            $order->payment_method=$req->payment;
            $order->payment_status="pending";
            $saved=$order->save();
        }
        if ($saved) {
            Cart::where('user_id',$user_id)->delete();
            // $req->session()->flash('message', 'Your order place, Successfully!');
            return $saved;
        }else {
            // $req->session()->flash('message', 'Something wrong, please try again!');
            return response([
                'error'=>['fail to cart']
            ]);
        }
        return response([
            'error'=>['fail to cart']
        ]);
    }
}
