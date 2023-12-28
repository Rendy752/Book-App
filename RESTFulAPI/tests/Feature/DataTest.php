<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function show_all_product()
    {
        Product::factory()->count(10)->create();

        $response = $this->json('GET', route('path.index'));

        $response->assertStatus(200);

        $response->json();

        /* Uncomment to view Response */
        //print_r($response->json());
    }

    /** @test */
    public function create_product()
    {
        $response = $this->json('POST', route('path.store'), [
            'title' => 'Dummy title',
            'description' => 'Dummy description'
        ]);

        $response->assertStatus(200);

        $this->assertEquals('Dummy title', $response->json()['product']['title']);

        /* Uncomment to show Response */
        //print_r($response->json());
    }

    /** @test */
    public function show_specific_product()
    {
        $this->json('POST', route('path.store'), [
            'title' => 'Dummy title',
            'description' => 'Dummy description'
        ]);

        $product = Product::all()->first();

        $response = $this->json('GET', route('path.show', $product->id));

        $response->assertStatus(200);

        $response->json();

        /* Uncomment to show Response */
        //print_r($response->json());
    }

    /** @test */
    public function update_product()
    {
        $this->json('POST', route('path.store'), [
            'title' => 'Dummy title',
            'description' => 'Dummy description'
        ]);

        $product = Product::all()->first();

        $response = $this->json('PUT', route('path.show', $product->id), ['title' => 'Dummy updated title']);

        $response->assertStatus(200);

        $response->json();

        /* Uncomment to show Response */
        //print_r($response->json());
    }

    /** @test */
    public function delete_product()
    {
        $this->json('POST', route('path.store'), [
            'title' => 'Dummy title',
            'description' => 'Dummy description'
        ]);

        $product = Product::all()->first();

        $response = $this->json('DELETE', route('path.destroy', $product->id));

        $response->assertStatus(200);

        $response->json();

        /* Uncomment to show Response */
        //print_r($response->json());
    }
}