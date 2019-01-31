run:
	npm run dev

install:
	npm i

clean:
	rm -fr node_modules

add:
	git add .

commit: add
	git commit -m 'modify'

push: commit
	git push -u origin master
