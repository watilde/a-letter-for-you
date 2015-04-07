# a-letter-for-you
Send a short encrypted message by GitHub ID

## Usage
```
Usage: a-letter-for-you [options]

Options:

  -h, --help              output usage information
  -V, --version           output the version number
  -u, --username [value]  target GitHub ID
  -m, --message [value]   write your message
  -o, --out [value]       output your letter to a file
```

## Install
```
$ npm install -g a-letter-for-you
$ a-letter-for-you --version
0.3.0
```

## Decrypt a message
```
$ openssl rsautl -decrypt -oaep -inkey <Your Secret Key> -in <Attachment>
```

## based on
https://github.com/moznion/naisho
