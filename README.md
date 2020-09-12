# Microsoft Azure IOT Hub - C2D Action

This action allows you to send a Cloud-to-Device message as part of your Github Actions CI/CD workflow. 

# Basic Usage

    - name: Publish Action C2D Message
      uses: dcparsons/azure-iot-action@v1.0.2
      with:
        iot-hub-connection-string: <iot hub connection string>
        device-id: <device id>
        message: <message>

## Parameters

 - **iot-hub-connection-string** - this should be the connection string to the IOT Hub that you setup in Microsoft Azure.  
 - **device-id** - the id of the device you want to send a message to
 - **message** - the message you want to send to the device

### Leveraging Secrets
Your IOT connection string is going to contain a shared access key which will grant anyone with the connection string access to your IOT Hub.  If you are going to use this action in your CI/CD workflow I would highly suggest using [GitHub Secrets](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) to store that data.  You can also choose to add your device-id as a secret.  Using secrets will change the implementation slightly as shown below.

    - name: Publish Action C2D Message
      uses: dcparsons/azure-iot-action@v1.0.2
      with:
        iot-hub-connection-string: ${{ secrets.IOT_HUB_CONNECTION_STRING }}
        device-id: ${{ secrets.DEVICE_ID }}
        message: <message>

Where `IOT_HUB_CONNECTION_STRING` and `DEVICE_ID` are the names of the secrets you setup. 

# Limitations
This action was built as part of my submission for the [dev.to 2020 Actions Hackathon](https://dev.to/devteam/announcing-the-github-actions-hackathon-on-dev-3ljn) and isn't something I consider ready for 'prime time'. It solves only a very specific use case: sending a single message to a known `device-id` that is connected to the specified Azure IOT Hub.  


# References

The JavaScript used to send messages to the Azure IOT Hub was taken from the [official Microsoft Documentation](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-node-node-c2d)

The YAML used to expose this as a Github action was taken from the [official GitHub Documentation](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)

