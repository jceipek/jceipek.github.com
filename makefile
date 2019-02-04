message:="Automated commit at $(shell date)"
deploy:
	@echo "Beginning deploy..."
	rm -rf public || true
	hugo --minify
	git checkout master
	@echo "Switched branches"
	find . -maxdepth 1 -not -name 'public' -not -name '.git' -not -name '.gitignore' -not -name '.' -exec rm -rf '{}' +
	mv public/* .
	@echo "Emptied public"
	rmdir public
	git add .
	git commit -m $(message) || (git checkout hugo && exit 1)
	git push origin master
	git checkout hugo
	@echo "Deploy complete."