<template>
  <Page>
    <ActionBar title="Detail" />
    <StackLayout>
      <Button text="1" width="33%" height="100" @tap="selectScore(1)" backgroundColor="orange" />
      <Button @tap="$modal.close" text="Close" />
      <TextField text="erererre" width="33%" height="100" backgroundColor="grey" />
    </StackLayout>
  </Page>
</template>