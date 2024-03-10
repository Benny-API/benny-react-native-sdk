# Benny React Native SDK

The Benny React Native SDK allows your React Native app to use Benny client libraries.

> **Note**
> See our complete documentation at [docs.bennyapi.com](https://docs.bennyapi.com).

## Installation

Install the SDK using your preferred package manager.

```shell
yarn install @bennyapi/react-native-sdk
```

## Usage

### EBT Balance Flow

The Ebt Balance flow allows users to link their EBT account, returning a tokenized representation
of their account credentials for the later fetching of balance and transaction information.

#### Required IDs

You'll need an `organizationId`, the ID representing your organization, along with
a `temporarylinkId` that is generated serverside via a call to the Benny API.

> **Note**
> Reach out to [help@bennyapi.com](help@bennyapi.com) to setup your organization.

#### Integration

The Ebt Balance flow is contained in a simple fullscreen component, `EbtBalanceFlow`, that
is initialized with your organization ID and the single-use temporary link ID.

Callbacks (i.e., `onExit` and `onDataExchange`) are responsible for communicating to your app when the user wants to
exit the flow
and when a data exchange is requested.

```typescript jsx
<EbtBalanceFlow
  organizationId="org_123"
  temporaryLinkId="temp_123"
  onExit={() => {
    /** Your on exit logic. */
  }}
  onLinkSuccess={
    /** Your on link success logic. */
  }
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
