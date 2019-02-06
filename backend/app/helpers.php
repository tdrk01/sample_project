<?php

if (! function_exists('webRoute')) {
    function webRoute($path, $options=[])
    {
        $base = config("web_url.".$path);
        foreach ($options as $key => $value) {
            $base = str_replace("{".$key."}", $value, $base);
        }
        return $base;
    }
}

