<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitddcd14b56962b8cd4517f18fa3cd7b01
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitddcd14b56962b8cd4517f18fa3cd7b01::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitddcd14b56962b8cd4517f18fa3cd7b01::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitddcd14b56962b8cd4517f18fa3cd7b01::$classMap;

        }, null, ClassLoader::class);
    }
}
