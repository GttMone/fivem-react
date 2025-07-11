# Documentation for NUI communication

# NUI Messages

- Triggered by the backend using the `SEND_NUI_MESSAGE` native

## Message object structure:
```ts
interface {
    action: string, // Name of the message action
    data?: {...} // Data for the action
}
```

# NUI Callbacks

- Triggered by the frontend, handled by the backend using the `REGISTER_NUI_CALLBACK` and `REGISTER_NUI_CALLBACK_TYPE` natives.

## Callback responses structure:

```ts
interface {
    error?: boolean, // If an error occurs, set this to true to display it in the UI. Setting this to 'false' has no impact.
    message?: string, // If the above is set to true or the below is set to false, this message will be displayed in the UI
    ok?: boolean, // Used for empty responses/acknowledgement. Can be set to 'false' to mimic an error.
    data: {...} // The data for the response. If `error` is false or `ok` is present this can be left out
}
```

- Examples
```json
{
    "error": true,
    "message": "This will be shown to the user via the UI"
}
```

```json
{
    "data": { "hello": "world" }
}
```

```json
{
    "ok": true
}
```