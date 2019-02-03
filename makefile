deploy:
	@echo "Beginning deploy..."
	rm -rf public || true
	hugo
	git checkout master
	@echo "Switched branches"
	find . -maxdepth 1 -not -name 'public' -not -name '.git' -not -name '.gitignore' -not -name '.' -exec rm -rf '{}' +
	mv public/* .
	@echo "Emptied public"
	rmdir public
	git add .
	git commit -m "Automated commit at" $(date)
	git push origin master
	git checkout hugo
	@echo "Deploy complete."