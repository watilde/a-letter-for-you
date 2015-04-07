# a-letter-for-you
Send a short encrypted message by GitHub ID

## Usage
```
Usage: a-letter-for-you -u <Target GitHub ID> -m <Message> [-o letter.txt]

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
$ gopenssl rsautl -decrypt -inkey <Your Secret Key> -in <Message File>
```

## based on
https://github.com/moznion/naisho
