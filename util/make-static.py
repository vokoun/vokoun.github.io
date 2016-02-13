#!/usr/bin/python

# make-static.py
# Copyright 2015  David Vokoun
# Free software under the terms of the MIT License


# Concat all views into the div#view element of index.html, generating 
# a static single page html document for Javascript-less browsers

index = ''

with open('../index.html', 'r') as fp:
	index = fp.read()

#print(index)

# remove the No Javscript warning
index = index.replace('<div id="no-js-detected"><span class="error">ERROR:</span> No Javascript detected, the plain html version: <a href="static/plain.html">static/plain.html</a></div>', '<div id="no-js-detected" class="center"><span class="error">Info:</span> You are viewing the plain HTML version of this site.</div>')
index = index.replace('static/normalize.css', '../static/normalize.css')
index = index.replace('static/skeleton.css', '../static/skeleton.css')
index = index.replace('static/style.css', '../static/style.css')


# get the div#view elements position in the string
p = index.index('<div id="view"></div>')


# adjust pointer to point between the opening and closing tag
p += len('<div id="view">')




# separate the header from the footer
header = index[:p]
footer = index[p:]

#print(header)
#print('|||split|||')
#print(footer)


# iterate through files in the view dir, and concat their contents into a single page
content = ''

#from os import walk
#f = []
#for (dirpath, dirnames, filenames) in walk('../view'):
#	f.extend(filenames)
#	break


def get(name):
	c = ''
	with open('../view/%s.html' % name, 'r') as fp:
		c = fp.read()
		c += '<br><hr><br>\n'
	return c

content += get('status')
content += get('resources')
content += get('dev')
content += get('media')
content += get('music')
content += get('blog')

#print(content)
#print(f)
# compile single page html
html = header + content + footer

#print(html)

# write page to plain.html
with open('../static/plain.html', 'w') as fp:
	fp.write(html)

print('[make-static.py] complete')