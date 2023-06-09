# Task 4

The promise starts eagerly because of the .reject(), meaning the execution is already on it's way before the .then() and .catch() handlers are attached.

After .then() is attached nothing happens, because the promise was rejected.

Then the catch() handler is attached an since the promise was rejected it, the error is passed to the handler and it logs the error to the console. It logs: Error: BOOOM

If we want to make sure that our .then() handler is executed, we should attach it immediately after creating the Promise. In this case it would not have been executing anyway since the Promise was rejected. Same goes for the .catch() handler
