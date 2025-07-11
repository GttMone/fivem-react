# Documentation for NUI communication

<br/>
<br/>
<br/>

# BACKEND

## NUI Messages

- Triggered by the backend using the `SEND_NUI_MESSAGE` native

### Message object structure:
```ts
interface {
    action: string, // Name of the message action
    data?: {...} // Data for the action
}
```

## NUI Callbacks

- Triggered by the frontend, handled by the backend using the `REGISTER_NUI_CALLBACK` and `REGISTER_NUI_CALLBACK_TYPE` natives.

**NOTE: You must ALWAYS respond to a callback, even if no data is expected. See below!**

### Callback responses structure:

```ts
interface {
    error?: boolean, // If an error occurs, set this to true to display it in the UI. Setting this to 'false' has no impact.
    message?: string, // If the above is set to true or the below is set to false, this message will be displayed in the UI
    ok?: boolean, // Used for empty responses/acknowledgement. Can be set to 'false' to mimic an error.
    data: {...} // The data for the response. If `error` is false or `ok` is present this can be left out
}
```

Examples:

- Response when there is an error
```json
{
    "error": true,
    "message": "This will be shown to the user via the UI"
}
```

- Response when data is expected
```json
{
    "data": { "hello": "world" }
}
```

- Response when no data is expected (REQUIRED TO RESPOND WITH THE FOLLOWING FORMAT)
```json
{
    "ok": true
}
```

<br/>
<br/>
<br/>

# FRONTEND

## Receiving NUI messages/events

To receive NUI events, you can use the `useOnNUI` and `useOnNUIs` hooks.

### useOnNUI
- The first parameter is the event name you'd like to listen to ('action' property from the backend)
- The second parameter is a callback function, that accepts a 'data' object, sent from the backend
- Example:

```ts
import { useOnNUI } from "@/hooks/useNUI";

function Component() {
    useOnNUI('myEventName', (data) => {
        setSomeData(data.info);
        setVisible(true);
    })
}
```

### useOnNUIs
You pass an object for the first parameter, where:
- The key names match the event names you'd like to listen to
- The value is a callback function, that accepts a 'data' object, sent from the backend

```ts
import { useOnNUIs } from "@/hooks/useNUI";

function Component() {
    useOnNUIs({
        open: (data) => {
            setSomeData(data);
            setVisible(true);
        },
        close: () => setVisible(false),
    });
}
```

## Sending NUI callbacks

To send NUI callbacks, you can import the 'nui' Axios instance:

**NOTE: The nui instance automatically displays error messages with a toast notification, but you should still handle errors yourself**

When expecting a response from the callback, it can have two of the following structures:

- ErrorResponse
```json
{
    "error": true,
    "message": "Something went wrong..."
}
```

- SuccessResponse
```json
{
    "error": false, // The 'error' property is always present, even if there is no actual error (it's set to false)
    "data": {} // Data sent from the backend
}
```

```ts
import { nui } from "@/lib/nui";

function Component() {
    nui.post('close'); // Triggers the callback named 'close'


    async function fetchSomeData() { // Fetches data from a callback and handles responses
        setLoading(true);

        try {
            // Use the NUIResponse type to enforce object structure.
            // You can pass a generic that will become the 'data' property sent from the backend
            const { data }: { data: NUIResponse<MyExpectedInterface> } = await nui.post('fetchSomeData');

            if (data.error) throw new Error(); // Pass to the 'catch' statement if the backend returns an { "error": true }

            setData(data.data);
        } catch {
            setData([]);
        } finally {
            setLoading(false);
        }
    }
}
```