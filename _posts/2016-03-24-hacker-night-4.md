---
layout: post
author: The RocHack Team
title: Hacker Night, Ep. 4
date: 2016-03-24
image: http://siliconangle.com/files/2011/08/matz.jpg
description: Ruby is a Gem.
---

### Making your own RubyGems!

![Hacker Night 4](http://siliconangle.com/files/2011/08/matz.jpg)
`puts "Hello again RocHack"`

This week, [Jeremy][jeremy] gave a talk on the [Ruby programming
language][ruby], and the prominent software distribution system that Ruby uses
([RubyGems][gems]). Some notes from the presentation:

1. The guy in the above photo is [Matz][matz], creator of Ruby.
2. He designed the language so that it would be enjoyable to program in.
2. Specifically, it has a concise, flexible interface, along with a very
   [positive][swan] community.
3. [RubyGems][gems] hosts Ruby libraries, called gems. Gems are optimized to be
   super-portable, make versioning code easy, and best of all they are totally
   free to use (both for downloading/installing code, or uploading gems that you
   made)!

### Gem setup tips

On cycle servers, install into `~/bin`, avoiding the need to use `sudo`. Note
that once you do this, you will have to add this folder to your shell's
[path][path]. Make this the default when installing gems by running with the
two commands down below. This will create a `bin` folder in your home
directory, and set the default the gem installation location to this folder

    cd && mkdir bin
    echo 'gem: -n~/bin/' >> $HOME/.gemrc

On OSX, the default ruby/gem version needs root access. Some options:

1. Use sudo every time you want to install a gem (inconvenient).
2. Setup: `echo 'gem: -n/usr/local/bin/' >> $HOME/.gemrc`

Try to install a gem, and see if it works:

    gem install tv.rb
    tv.rb --wavy pride

There should be a rainbow in your terminal. Press Control-C to stop!

### Writing a gem

Here is a good example of a simple Ruby gem: ([qrush/hola][basic]). Initially,
there may seem like there are a much of random files. Each has their place and
purprose, though. Here is a brief description of each file/folder you may see
in a standard gem:

- Gemspec: gem details (author, license, files)
- Gemfile: listing gem dependencies (bundle)
- Rakefile: automate tasks (ruby + make)
- lib/ where you keep main source code
- bin/ where you put executables (+x)
- spec/ or test/ where you put code tests

More help on building your first gem [found here][first].


### [<a target="_blank" href="https://docs.google.com/presentation/d/1qWJpo6NSjeqXF6DEMHikPtHMiYy_krLB0fuahpZilPE/pub?start=true&loop=true&delayms=5000"> link to the full presentation slides </a>]

Thanks to everyone who came out and listened to me rant about Ruby!

-- jeremy

[ruby]:https://www.ruby-lang.org/en/
[matz]:https://en.wikipedia.org/wiki/Yukihiro_Matsumoto
[gems]:https://rubygems.org/
[path]:https://kb.iu.edu/d/acar
[swan]:https://en.wikipedia.org/wiki/MINASWAN
[basic]:https://github.com/qrush/hola
[first]:http://guides.rubygems.org/make-your-own-gem/#your-first-gem
[jeremy]:http://jeremywrnr.com/

