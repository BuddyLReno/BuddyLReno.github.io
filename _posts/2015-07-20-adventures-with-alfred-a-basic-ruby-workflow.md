---
layout: post
title: "Adventures with Alfred: A Basic Ruby Workflow"
date:  2015-07-20
description: "Learning how to use Alfred by creating a simple workflow."
---

I've been using [Alfred](http://www.alfredapp.com) for a little bit now, and have fallen in love with it's amazing workflow feature. The power it brings to automation is incredible and easy to use. After toying with some of the different workflows out there, a lot of them from [Packal](http://www.packal.org), I wanted to learn how to create my own. 

Alfred allows you to run scripts in various languages, such as php, bash, and apple script, but I'm most familiar with ruby. I found some good tutorials on creating workflows with ruby but I needed to understand Alfred and how workflows function before going deeper. I'll walk through the process of creating my first workflow with ruby, trying to keep it as simple as possible.
<!--more-->

For my first workflow, I decided to automate (at least partially) my weekly report process. I write my reports in markdown, so it'll be easy to work with. What I wanted this workflow to accomplish:

- Run task with a keyword.
- Run a ruby script to create a new report, update header data, and use previous report's data for content.
- Copy the file name (without extension) to the clipboard
- Show a notification that the workflow completed.

Searching for "Alfred ruby workflow", you'll come across an awesome [template built by Zhaocai](https://github.com/zhaocai/alfred-workflow). This is great for when you expand your workflow to take care of multiple tasks, save settings, and distribute. However, it does require you to have a good understanding of workflows, so I'm skipping this for now.

## Creating Workflow

Open Alfred and navigate to the workflow pane.  At the bottom of the panel on the left, click the plus button and select a Blank Workflow.

![create workflow](/assets/images/alfred-ruby-workflow/create-blank-workflow.png)

Alfred will then ask you to input some details about your workflow to identify it. You can put whatever you'd like in each of the inputs, and even add your own image to identify your workflow.  I've skipped the image portion, but you can see an example of how to fill the other fields out below.

![workflow details](/assets/images/alfred-ruby-workflow/workflow-details.png)

For this workflow, we'll want to create a keyword input.  A keyword input will run a specific task when we type it in to Alfred.  To create one, click the plus button on the upper right of the workflow canvas.  Select the Keyword option from the Input menu to bring up a new window asking for details about your keyword.

To keep it easy, I've decided that my keyword doesn't accept any user input.  The title and subtext inputs appear when you're typing into Alfred.

![keyword details](/assets/images/alfred-ruby-workflow/keyword-details.png)
![keyword details](/assets/images/alfred-ruby-workflow/keyword-details-preview.png)

## Adding the Script
Click the plus button on the workflow canvas and select "Run Script" from the Actions menu.  This will bring up a new window asking for your script details. I've left everything as default here as well, except I changed the language to ruby.

![ruby script](/assets/images/alfred-ruby-workflow/ruby-script.png)

I've provided my script below and commented on a few lines, notable to working with Alfred. This isn't necessarily good ruby code, but I'm not concerned about that right now; version 1.0 people. Feel free to edit and use it, but since it's not really meant to be shared, you'll need to make some significant changes. Add your script and save it.

{% highlight ruby %}
	require 'fileutils'
require 'date'

# Provided by Alfred, but not used in this script. 
# {query} is the user input from Alfred.
query = "{query}"

firstDay = Date.parse("25-02-2013") 
report_source_dir = "#{Dir.home}/Dropbox/Lampo/Weekly Reports/#{Date.today.year}/MD Source/"
vol = ((Date.today.year * 12 + Date.today.month) - (firstDay.year * 12 + firstDay.month)) / 12 + 1
header_template = %Q{# The Reno Report
**#{Date.today} | Vol. #{vol}**

---
}

FileUtils.cd(report_source_dir) do
  last_report = Dir.glob("WeeklyReport_*.md").last
  new_report_content = header_template + File.read(last_report).split("\n---\n")[1]
  new_report_name = "WeeklyReport_#{Date.today.strftime('%m-%d-%y')}.md"
  File.new(new_report_name, "w+")
  File.open(new_report_name, "w") do |file|
     file.puts(new_report_content)
  end
  # Opens report in default application.
  system %{ open "#{report_source_dir + new_report_name}" }
end

# Alfred passes anything echoed or printed to the next item in the workflow.  
# This allows us to copy the file name to the clipboard.
print "WeeklyReport_#{Date.today.strftime('%m-%d-%y')}"
{% endhighlight %}


Now you have on the canvas a Keyword item and a Run Script item.  When you hover your mouse over the Keyword item, you'll see a little nub pops out on the right.  Click and drag that nub to the Run Script item to connect the two together.

![connect workflow items](/assets/images/alfred-ruby-workflow/connect-workflow-items.png)

## Finalizing the Workflow
The last two things I wanted my workflow to accomplish was to copy the name to the clipboard and notify me that the workflow ran successfully.  To do this, click the plus button at the top right of the workflow again and from the Output menu, add a Post Notification and a Copy to Clipboard action.  

### Copy To Clipboard
Since the ruby script printed the filename, the filename was added to the `{query}` variable that Alfred provides. We just have to add `{query}` to the Copy To Clipboard input window.
	
![copy to clipboard](/assets/images/alfred-ruby-workflow/copy-to-clipboard.png)

Like before with the Keyword item, hover over the Run Script item and a nub appears to the right.  Click and drag it to the Copy to Clipboard item to connect the two.  This action makes sure that the `{query}` parameter is passed properly.
	
### Post Notification
Last but not least, the post notification will display a banner when the script is finished in Notification Center.  I've left a lot of these details as default, just adding the Title and Description.  You can use the `{query}` variable here to show the filename as well.
	
![post notification](/assets/images/alfred-ruby-workflow/post-notification.png)You'll notice that you can't hover over the Copy To Clipboard item to get a connector nub to appear, since it doesn't output anything.  Workflow items that have output can be connected to multiple items, however, so connect the Run Script item to the Post Notification item.  You should have a workflow that looks like the example at the bottom.

![finalized workflow](/assets/images/alfred-ruby-workflow/finalized-workflow.png)

## RecapCreating this workflow has taught me a few things about Alfred:

- How to create Keyword actions to run scripts.
- Getting data from scripts to pass to other workflow items.
- Copying output to clipboard and posting a success message.

There's definitely some issues with how this workflow functions, namely I have to manually create the new report directory and file when the new year flips, plus It would be nice to figure out to how to automatically email my report after I've finished writing it.  Before, this seemed like a daunting task, but this simple example workflow showed me how that it's not as tough as I thought.  

Hopefully, you've come away with an idea of something to automate in your daily life!