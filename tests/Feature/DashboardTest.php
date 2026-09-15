<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('dashboard'));
        $response->assertOk();
    }

    public function test_authenticated_users_can_toggle_their_task_status()
    {
        $user = User::factory()->create();
        $post = Post::create([
            'user_id' => $user->id,
            'title' => 'Finish task',
            'content' => 'Mark this task complete',
        ]);

        $response = $this->actingAs($user)->patch(route('posts.status', $post));

        $response->assertRedirect();
        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'status' => 'completed',
        ]);
    }

    public function test_users_only_see_their_own_dashboard_tasks(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        Post::create([
            'user_id' => $user->id,
            'title' => 'My task',
            'content' => 'Visible to me',
        ]);
        Post::create([
            'user_id' => $otherUser->id,
            'title' => 'Other task',
            'content' => 'Not visible to me',
        ]);

        $response = $this->actingAs($user)->get(route('dashboard'));

        $response->assertInertia(fn ($page) => $page
            ->where('totalPosts', 1)
            ->where('myPosts', 1)
            ->has('recentPosts', 1)
            ->where('recentPosts.0.title', 'My task')
        );
    }

    public function test_free_users_can_create_only_five_tasks(): void
    {
        $user = User::factory()->create();

        foreach (range(1, 5) as $taskNumber) {
            Post::create([
                'user_id' => $user->id,
                'title' => "Task {$taskNumber}",
                'content' => 'Existing task',
            ]);
        }

        $response = $this->actingAs($user)->post(route('posts.store'), [
            'title' => 'Sixth task',
            'content' => 'This should require an upgrade',
        ]);

        $response->assertSessionHasErrors('title');
        $this->assertDatabaseMissing('posts', ['title' => 'Sixth task']);
    }
}
