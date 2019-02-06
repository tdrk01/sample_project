<!DOCTYPE html>
<html lang="{{config('app.locale')}}">
<head>
    <title>
    	{{config('app.title')}}
    </title>
    <meta name="description" content="{{config('app.description')}}">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <link rel="shortcut icon" type="image/x-icon" href="{{asset('favicon.ico')}}">
    
    <link rel="stylesheet" href="{{mix('css/app.css')}}" />
    @yield('head')

</head>
<body class="uk-position-relative">

  <nav class="uk-navbar-container uk-background-white uk-box-shadow-small" uk-navbar uk-sticky>
    <div class="uk-navbar-left">
        <a class="uk-navbar-item uk-logo" href="{{route('provider.view')}}">
            tamate baco <small class="uk-margin-small-left">コンテンツ管理者ページ</small>
        </a>
    </div>
    <div class="uk-navbar-right">
      <div class="uk-navbar-item">
        @auth("provider")
        <a class="uk-button uk-button-primary" href="{{route('provider.logout')}}">
          ログアウト
        </a>
        @else
        <a class="uk-button uk-button-primary" href="{{route('provider.login')}}">
          ログイン
        </a>
        @endauth
      </div>
    </div>
  </nav>


  <div class="uk-offcanvas-content">
    <div id="main">
      <div class="uk-section">
        <div class="uk-container uk-container-large">
          <div uk-grid class="uk-grid-large">
            @hasSection('sidebar')
            <div class="uk-width-medium@m">
              @yield('sidebar')
            </div>
            @endif
            <div class="uk-width-expand">
              @yield('content')
            </div>
          </div>
        </div>
      </div>
    </div>
    @include('layouts.footer')
  </div>

  @if(isset($errors) || session('message') != null )
  <div class="uk-position-fixed uk-position-top-center uk-width-large@s" style="z-index: 1000;">
  @foreach ($errors->all() as $message)
      <div class="uk-display-inline-block uk-width-1-1 uk-margin-small uk-alert-danger" uk-alert>
          <a class="uk-alert-close" uk-close></a>
          <p>
              {{$message}}
          </p>
      </div>
  @endforeach
  @if( session('message') != null )
    <div class="uk-display-inline-block uk-width-1-1 uk-margin-small uk-alert-success" uk-alert>
          <a class="uk-alert-close" uk-close></a>
          <p>
              {{ session('message') }}
          </p>
      </div>
  @endif
  </div>
  @endif

  <div class="uk-position-fixed uk-position-z-index uk-position-bottom-right uk-position-small">
    <a class="uk-scroll-top" uk-icon="chevron-up" uk-scroll>
    </a>
  </div>

  <!-- Global site tag (gtag.js) - Google Analytics -->
  @yield('bottom')

  <script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js" integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+" crossorigin="anonymous"></script>

  <script src="{{mix('js/app.js')}}"></script>
  
</body>
</html>	