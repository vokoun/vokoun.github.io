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

# remove the No Javascript warning, and change a few things 
index = index.replace('<div id="no-js-detected" class="center"><span class="error">ERROR:</span> No Javascript detected, view the plain html version: <a href="plain.html">plain.html</a></div>', 
	                  '<div id="no-js-detected" class="center"><span class="error">INFO:</span> no javascript detected, now viewing the single page plain HTML version)</div>')


# get the div#view elements position in the string
p = index.index('<div id="view"></div>')


# adjust pointer to point between the opening and closing tag
p += len('<div id="view">')

# sever the head from foot at p
header = index[:p]
footer = index[p:]


# get files and concat their contents into a single page
content = ''

def fs_readfile(name):
	c = ''
	with open('../view/%s.html' % name, 'r') as fp:
		c = fp.read()

	return c


views = ['status', 'resources', 'dev', 'media', 'music', 'blog']

for v in views:
	content += fs_readfile(v)
	content += '\n<br><hr><br>\n'

# compile single page html
html = header + content + footer

# write page to plain.html
with open('../plain.html', 'w') as fp:
	fp.write(html)

print('[make-static.py] complete')