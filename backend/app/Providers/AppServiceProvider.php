<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

use App\Services\BoxService;
use App\Services\ConditionService;
use App\Services\ContentCategoryService;
use App\Services\ContentImageService;
use App\Services\ContentService;
use App\Services\OauthService;
use App\Services\PayJpService;
use App\Services\PaymentService;
use App\Services\PromotionService;
use App\Services\ProviderService;
use App\Services\PurchaseService;
use App\Services\QuestionService;
use App\Services\SummaryService;
use App\Services\UserService;
use App\Services\ContactService;
use App\Services\SocialAccountService;
use App\Services\SampleService;

use Payjp\Payjp;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //日時の表示フォーマット
        Blade::directive('datetime', function ($expression) {
            return "<?php echo !is_null($expression) ? (new DateTime($expression))->format('Y-m-d H:i') : null; ?>";
        });

        //日時の表示フォーマット
        Blade::directive('date', function ($expression) {
            return "<?php echo !is_null($expression) ? (new DateTime($expression))->format('Y-m-d') : null; ?>";
        });

        //日時の表示フォーマット
        Blade::directive('jpdate', function ($expression) {
            return "<?php echo !is_null($expression) ? (new DateTime($expression))->format('Y年m月d日') : null; ?>";
        });

        //改行コード込みの文字列を改行して表示する
        Blade::directive('lined', function ($expression) {
            return "<?php echo nl2br($expression); ?>";
        });

        Payjp::setApiKey( config("services.payjp.private_key") );
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(BoxService::class, BoxService::class);
        $this->app->singleton(ConditionService::class, ConditionService::class);
        $this->app->singleton(ContentCategoryService::class, ContentCategoryService::class);
        $this->app->singleton(ContentImageService::class, ContentImageService::class);
        $this->app->singleton(ContentService::class, ContentService::class);
        $this->app->singleton(OauthService::class, OauthService::class);
        $this->app->singleton(PayJpService::class, PayJpService::class);
        $this->app->singleton(PaymentService::class, PaymentService::class);
        $this->app->singleton(PromotionService::class, PromotionService::class);
        $this->app->singleton(ProviderService::class, ProviderService::class);
        $this->app->singleton(PurchaseService::class, PurchaseService::class);
        $this->app->singleton(QuestionService::class, QuestionService::class);
        $this->app->singleton(SummaryService::class, SummaryService::class);
        $this->app->singleton(UserService::class, UserService::class);
        $this->app->singleton(ContactService::class, ContactService::class);

        $this->app->singleton(SocialAccountService::class, SocialAccountService::class);
        $this->app->singleton(SampleService::class, SampleService::class);
    }
}
