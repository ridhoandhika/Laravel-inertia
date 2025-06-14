<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Contoh data base64 dari string acak (bisa dianggap sebagai isi file dummy)
        $imageUrl = 'https://th.bing.com/th/id/OIP.m39aI7v6Mgsk2r_ozkpVBQHaG6?r=0&rs=1&pid=ImgDetMain&cb=idpwebp1&o=7&rm=3'; // Random image 200x200

        // Ambil konten gambar dari URL
        $imageContent = file_get_contents($imageUrl);

        // Konversi ke base64
        $fileContent = base64_encode($imageContent);
            return [
                'name' => $this->faker->words(2, true),
                'description' => $this->faker->paragraph(),
                'price' => $this->faker->randomFloat(2, 10, 1000),
                'stock' => $this->faker->numberBetween(1, 100),
                'file' => $fileContent,
            ];
    }
}
