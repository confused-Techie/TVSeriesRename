# TVSeriesRename

> CLI App to Help Bulk Renaming of TV Series Files.

## Running

```
npm install @confused-techie/tvseriesrename -g
```

Then to run it simply find the folder you want to start renaming files in.

```
tvseriesrename ./folder/to/work/on
```

Thats it, this can be a full path, or relative path. But there are some options you can specify if you'd like.

## Options

* Debug

`--debug=true`

Will set the debug flag to on, and will debug additional output to the screen.


## Example

This will take examples of the following:

```
Lost.s02e07.The Other 48 Days.mkv => S02E07.mkv
Supernatural S12E16 - Ladies Drink Free.mkv => S12E16.mkv
```

## Uses

This is intended for use of helping speed up the life of those that manage a Jellyfin Server Library Manually.

## Siblings

### OriginalWhoRename
Check out [OriginalWhoRename](https://github.com/confused-Techie/OriginalWhoRename) which is built specifically to help rename Classic Doctor Who Episodes for Jellyfin.

## Change Log

* Able to support Episodes up to three digits.
