SnapExtensions.primitives.set(
    'mc_split(textToSplit, index)',
    function (textToSplit, index ,proc) {
      var tokensArray = textToSplit.slice(3).split(",");
      if (index > tokensArray.length-1) {
        return -1; // error, index over array length
      } else {
        return tokensArray[index];	
      }
    }
);

SnapExtensions.primitives.set(
    'mc_isopen(port)',
    function (port, proc) {
      return (port?.writable != null)   
    }
);

SnapExtensions.primitives.set(
    'mc_open(baud, buffer)',
    function (baud, buf, proc) {
        var acc = proc.context.accumulator;
        // define a filter for CH340 serial to USB device
        const filter_mc2 =  { usbVendorId: 0x1A86, usbProductId: 0x7523 }; // CH340G usb to serial present int MC2
        const filter_mc3 =  { usbVendorId: 0x0403, usbProductId: 0x6001 }; // FTDI usb to serial present int MC3
                        
        async function forceClose(port){
            try {
                if (!port?.writable) {return; } // already closed
                // console.log("force close...", port);
                if (port._reader) {await port._reader.cancel(); }
                if (port?.readable) {await port.readable.cancel(); }
                if (port?.writable) {await port.writable.abort(); }
                if (port?.writable) {await port.close(); } // close if open
            } catch (e) {
                // console.log( e);
                acc.result = e;
            }
        }

        if (!acc) {
            acc = proc.context.accumulator = {result: false};
            (async function (baud) {
                try {
                    var port;
                    port = await navigator.serial.requestPort({ filters: [filter_mc2, filter_mc3] });
                    await forceClose(port);
                    await port.open({
                        baudRate: baud,
                        bufferSize: buf || 15000
                    });
                    acc.result = port;
                    port._bklog = [];//backlog
                } catch(e) {
                    acc.result = e;
                }
            }) (baud || 115200);
        } else if (acc.result !== false) {
            if (acc.result instanceof  Error) {
                throw acc.result;
            }
            return acc.result;
        }
        proc.pushContext('doYield');
        proc.pushContext();
    }
);

SnapExtensions.primitives.set(
  'mc_isValidFrame(frame)',
  function (frame, proc) {
    try {
      return (frame.slice(0,3) === '#0A');
    } catch(e) {
      return false;
    }
  }
);

SnapExtensions.primitives.set(
  'mc_buildFrame(fun, payload)',
  function (fun, payload, proc) {
    var frame = new List(Array.from(new TextEncoder().encode('#'+fun+payload+'\n')));
    return frame;
  }
);
