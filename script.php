<?php

/**
 * production: false,
  firebase: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  }
 */

class JsonFormatter
{
  static $result = '';
  static $separator = '';

  public static function iterateArray($data) : string
  {
    static::$result .= '[';
    static::$separator = '';
    foreach ($data as $key => $val) {
        if (is_int($val)) {

        } elseif (is_string($val)) {
            static::$result .= '"' . str_replace('"', '\"', $val) . '"';
        } elseif (is_bool($val)) {
            static::$result .= $val ? 'true' : 'false';
        } elseif (is_object($val)) {
            static::iterateObject($val);
            static::$result .= ', ';
        } elseif (is_array($val)) {
            static::iterateArray($val);
            static::$result .= ', ';
        } else {
            static::$result .= $val;
        }
        if (!is_int($val)) {
            static::$separator = ', ';
        }
    }

    static::$result .= ']';
    return static::$result;
  }

  public static function iterate($data)
  {
    if (is_array($data)) {
        static::iterateArray($data);
    } elseif (is_object($data)) {
        static::iterateObject($data);
    }
    return static::$result;
  }

  public static function iterateObject($data)
  {
    static::$result .= '{';
    static::$separator = '';
    foreach ($data as $key => $val) {

        static::$result .= static::$separator . $key . ':';

        if (is_int($val)) {
            static::$result .= $val;
        } elseif (is_string($val)) {
            static::$result .= '"' . str_replace('"', '\"', $val) . '"';
        } elseif (is_bool($val)) {
            static::$result .= $val ? 'true' : 'false';
        } elseif (is_object($val)) {
            static::iterate($val, true);
            static::$result .= ', ';
        } elseif (is_array($val)) {
            static::iterateObject($val);
            static::$result .= ', ';
        } else {
            static::$result .= $val;
        }
        static::$separator = ', ';
    }
    static::$result .= '}';
    return static::$result;
  }

}

$data['production'] = true;
$data['firebase'] = [
  'apiKey' => getenv('API_KEY'),
  'authDomain'=> getenv('AUTH_DOMAIN'),
  'databaseURL' => getenv('DATABASE_URL'),
  'projectId' => getenv('PROJECT_ID'),
  'storageBucket' => getenv('STORAGE_BUCKET'),
  'messagingSenderId' => getenv('MESSAGING_SENDER_ID'),
  'appId' => getenv('APP_ID')
];

$data_json = "export const environment = " . JsonFormatter::iterateObject($data);

$file = fopen('src/environments/environment.prod.ts', 'w+');
fwrite($file, $data_json);
$fclose;
