---
layout: post
author: The RocHack Team
title: Hacker Night, Ep. 3
date: 2016-02-25
image: http://rochack.org/static/posts/2016-02-25-screenshot.png
description: iOS, I do confess, thou art the bes(t)
---
![Hacker Night 3](/static/posts/2016-02-25-screenshot.png)
`NSLog("Hello again RocHack");`

Thank you guys for voting on our Facebook poll! **iOS is our winner tonight!** (by a close margin).

We'll have a 10-15 minute demo of making a quick clone of the Uber interface, I think. Highlights include a Swift lang intro, Interface Builder, MapKit, and Xcode probably being uncooperative about a dozen times. Followed by a workshop, and then usual RocHack antics.

**Update:** [**Download the source code here!**](/static/posts/2016-02-25-UberApp.zip)

Here's a quick rundown of the talk:

0. Download Xcode! Unfortunately this is only available on Mac. You can get it from the Mac App Store (it might take a year or two to download :P)
1. We started by [deciding on the layout of what we were trying to build](https://www.google.com/search?espv=2&biw=1440&bih=801&tbm=isch&sa=1&q=uber+interface&oq=uber+interface&gs_l=img.3...819.819.0.964.0.0.0.0.0.0.0.0..0.0....0...1c.1.64.img..0.0.0.6kq1mfA9IGc#imgrc=OeFMLkrKLo8QiM%3A). This is important!

2. We have to add MapKit as a dependency to our project. Click on the root-level project on the left (with the blue icon), go to the Build Phases, and under Link Binary with Libraries, click the `+` and search for & add MapKit.framework.

3. We also have to add a permission to get the user's location. To do this, add click on the Info tab in that same view, hover over one of the items in that first section (like "Bundle name" for example), click the plus, and enter `NSLocationWhenInUseUsageDescription` on the left, and a message on the right, like "Please give us your location!!!".

4. We opened the `Main.storyboard` file, which is Interface Builder file for our main view. In the search field on the very bottom-right of the screen (if you don't have a right panel click on the most top-right button of the window) we searched for "map view" and dragged it into the view. On the fourth tab along the top of the right panel (one with an arrow pointing downwards), check `Shows User Location`. Also hold control and drag from the map to the item that says View Controller (yellow icon) on the left bar of the Interface Builder interface, and select delegate.

5. We selected the map view in the view and defined **constraints** for it. (This is how you lay out components in iOS so that they are flexible/screensize-independent). To do this, we clicked on the button with the square between two lines on the bottom of the screen (with tooltip 'Pin'), added a spacing of 0 for all for directions, and clicked Add Constraints. Then we selected the map view again and clicked on the triangle between two lines and clicked Update Frames. When you save and run the app you should see a full-screen map!

6. Now add in the code from the project included. I'll let you figure out how to add constraints for the text field and pin image (to reference an image, add an image into Assets.xcassets and then choose it from the dropdown in the third tab on the right pane of Interface Builder.) To connect the textfield in Interface Builder to the variable in code, control-drag from the View Controller item to the text field and select `textField` (opposite of what we did with the map & delegate).

7. Hopefully the code is self-explanatory, I added comments!

### Hylan 301, 8pm. Come hungry for healthy snacks. See you guys there!!!

