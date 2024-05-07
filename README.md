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

Callbacks (i.e., `onExit` and `onLinkResult`) are responsible for communicating to your app when the user wants to
exit the flow and when a link result is obtained.

```typescript jsx
<EbtBalanceLinkFlow
  organizationId="org_wup29bz683g8habsxvazvyz1"
  temporaryLink="temp_clr0vujq9000108l66odc7fxv"
  onExit={() => {
    /** Your on exit logic. */
  }}
  onLinkResult={
    /** Your on link result logic. */
  }
  environment={EbtBalanceLinkFlowEnvironment.Sandbox}
/>
```
#### Environments
Set the environment to `EbtBalanceLinkFlowEnvironment.Sandbox` to integrate with the Benny sandbox environment,
or omit to default to the production environment.

### Handling Browser Navigation

On Android's hardware back press or gesture, the flow will go back if there are previous screens.

### EBT Transfer 

The Ebt Transfer product is comprised of three flows: EbtTransferLinkCardFlow, EbtTransferBalanceFlow, and the EbtTransferFlow. 

Once a user successfully goes links their Ebt card through the EbtTransferLinkCardFlow and a transfer token is created, the EbtTransferBalanceFlow
and EbtTransferFlow can be used. The EbtTransferBalanceFlow is used to check a user's balance. The EbtTransferBalanceFlow is used to initiate 
a transfer. 

#### EBT Transfer Link Card Flow 

##### Integration 

Similar to the Ebt Balance Link Flow, The Ebt Transfer Link Card Flow is contained in a fullscreen component, `EbtTransferLinkCardFlow`, that is initialized with an organization ID and single-use temporary link.

Callbacks (i.e., `onExit` and `onLinkResult`) are responsible for communicating to your app when the user wants to
exit the flow and when a link result is obtained. A successful link result returns a transfer token and expiration date for the transfer token.
A failed link result returns an error message. 

```typescript jsx
<EbtTransferLinkCardFlow
  organizationId="org_wup29bz683g8habsxvazvyz1"
  temporaryLink="temp_clr0vujq9000108l66odc7fxv"
  onExit={() => {
    /** Your on exit logic. */
  }}
  onLinkResult={
    (transferToken?: string, expiration?: string, error?: string) {/** Your on link result logic. */}
  }
  environment={EbtTransferEnvironment.Sandbox}
/>
```

#### EBT Transfer Balance Flow 

##### Integration 

The Ebt Transfer Balance Flow is contained in a fullscreen component, `EbtTransferBalanceFlow`, that is initialized with an organization ID and transfer token.

Callbacks (i.e., `onExit` and `onResult`) are responsible for communicating to your app when the user wants to
exit the flow and when a result is obtained. A successful result returns a balance. A failed link result returns an error message. 

```typescript jsx
<EbtTransferBalanceFlow
  organizationId="org_wup29bz683g8habsxvazvyz1"
  transferToken="transfer_sf3k3absxvazvjsd3lks"
  onExit={() => {
    /** Your on exit logic. */
  }}
  onResult={
   (balance?: string, error?: string) => {/** Your logic here. */}
  }
  environment={EbtTransferEnvironment.Sandbox}
/>
```

#### EBT Transfer Flow 

##### Integration 

The Ebt Transfer Flow is contained in a fullscreen component, `EbtTransferFlow`, that is initialized with an organization ID and a transfer token.

Callbacks (i.e., `onExit` and `onResult`) are responsible for communicating to your app when the user wants to
exit the flow and when a transfer result is obtained. A successful result calls the onResult callback with no value.
A failed result returns an error message. 

```typescript jsx
<EbtTransferFlow
  organizationId="org_wup29bz683g8habsxvazvyz1"
  transferToken="transfer_sf3k3absxvazvjsd3lks"
  onExit={() => {
    /** Your on exit logic. */
  }}
  onResult={
      (error?: string) => {/** Your result logic. */}
  }
  environment={EbtTransferEnvironment.Sandbox}
/>
```

#### Environments
Set the environment to `EbtTransferEnvironment.Sandbox` to integrate with the Benny sandbox environment,
or omit to default to the production environment.

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
