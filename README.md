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

### EBT Balance Link Flow

The Ebt Balance Link Flow allows users to link their EBT account, verifying the account, and
returning a tokenized representation of the credentials for fetching balance and transaction information.

#### Required IDs

You'll need an `organizationId`, the ID representing your organization, along with
a `temporarylink` that is generated serverside via a call to the Benny API.

> **Note**
> Reach out to [help@bennyapi.com](help@bennyapi.com) to set up your organization.

#### Integration

The Ebt Balance Link Flow is contained in a simple fullscreen component, `EbtBalanceLinkFlow`, that
is initialized with your organization ID and the single-use temporary link.

Callbacks (i.e., `onExit` and `onLinkSuccess`) are responsible for communicating to your app when the user wants to
exit the flow and when a link is successful.

```typescript jsx
<EbtBalanceLinkFlow
  organizationId="org_wup29bz683g8habsxvazvyz1"
  temporaryLink="temp_clr0vujq9000108l66odc7fxv"
  onExit={() => {
    /** Your on exit logic. */
  }}
  onLinkSuccess={
    /** Your on link success logic. */
  }
  environment={EbtBalanceLinkFlowEnvironment.Sandbox}
/>
```
#### Environments
Set the environment to `EbtBalanceLinkFlowEnvironment.Sandbox` to integrate with the Benny sandbox environment,
or omit to default to the production environment.

### Handling Browser Navigation

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
