<?php

// A demonstration of RPC with two parameters

function add($number) {
    echo $number[0] . ' + ' . $number[1] . ' = ' . ((int)$number[0] + (int)$number[1]);
    return 0;
}