# Benny React Native SDK

The Benny React Native SDK allows your React Native app to start and communicate with the Benny Apply flow.

> **Note**
> See our complete documentation at [docs.bennyapi.com](https://docs.bennyapi.com).

### Installation

Install the SDK using your preferred package manager.

```shell
yarn install @bennyapi/react-native-sdk
```

### Usage

#### Required IDs

You'll need an `organizationId`, the ID representing your company or organization and
ensure correct attribution.

> **Note**
> Reach out to [help@bennyapi.com](help@bennyapi.com) to setup your organization.

#### Integration

The Benny Apply flow is contained in a simple fullscreen component, `BennyApplyFlow`, that
is initialized with your organization ID and the external ID. The `externalId` is a non-empty string without spaces that
is your organization's unique representation of a user.
This ID is important to ensure that flow state can be tracked and restored.

Callbacks (i.e., `onExit` and `onDataExchange`) are responsible for communicating to your app when the user wants to
exit the flow
and when a data exchange is requested.

```typescript jsx
<BennyApplyFlow
  organizationId="org_123"
  externalId="cus_123"
  onExit={() => {
    /** Your on exit logic. */
  }}
  onDataExchange={() => {
    /** Your on data exchange logic. */
  }}
/>
```

#### Handling Browser Navigation

On Android's hardware back press or gesture, the flow will go back if there are previous screens.

### Example App

The [Expo example app](example/src/App.tsx) can be run with:

```shell
yarn example android
```

or

```shell
yarn example ios
```

### Author

[Benny API Inc.](https://bennyapi.com)

### License

The Benny SDK is available under the MIT license.
