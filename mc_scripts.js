SnapExtensions.primitives.set(
  'mc_setMochiLogo()',
  function () {
    IDE_Morph.prototype.createLogo = function () {
      var myself = this;

      if (this.logo) {
        this.logo.destroy();
      }

      this.logo = new Morph();

      this.logo.texture = "data:image/png;base64," +
        "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAcAI4DASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAkIBgcD/8QAMBAAAQIGAQMBBwMFAAAAAAAAAQIDAAQFBgcREggTIRQJFhciMUFRFTKBNEJhcZH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8AlVCEbN6F+l6xL3sO+8zZe9S7jqz0FIp8stTap18JClAlJBIAUgBII5KWPOgdhjKEVbd6bukhzEw6mZakVlePGJFQXZnqVAOT3dDQbJKyoK5fLx58fIVvXg+Y5b6E7IyxfGD6/hd52hWXlArDshMrLq6Z2kd15aQokkBCVgpJIC0gb0oasSp5QikqW+i45X+A/uBV+frP0T4g/qCu76/l2+WuX7e58u+PHf8Abx8xy+Keg+wLGq2W71zJcL01i/HtXdpDQp5LbtWfQU/L48jXNCOKSCVkjYCSShWAoRs7L989HWScW3ILNsy4sbXtTmQujKUpb7VRXsDg4O44lII+pOiPqCfoetuPouncidCuE6/jGwFVy9p+amn6zPSIT6hxkqdCe4VKA4gpSB+P5MCsG0xiXmalKMzcwZSUcdQh6YCCvtIJAUriProbOvvqO9z/AGbYth5Jm6Rjq8V31bDbDK2qwuXLBU4pAK0aOt8T43/H2jYPWx0mWfhel9NNJkLfapVZrIbp1wuNLVym3ty3cK/JHLk44Nj8/wCBHkXtLcSWrhbqgnbfs2js0KiKpUnNJkpcqKELUkhRGySNlO/9kwGVYQhEUhCEAhCEAhCEAigGFbzotc9lLl+0WarJyVwUyqpnXZN59Lbr7K3ZZSSlJO1b4LT4+6dRP+EB6Izn+92MIv4lRVU+4z9QFTXIFhBV3ho+HNcgnYB471sRQTH+eLO6d+nXpEuaoVlioTtOqdQE7IybqXXWJKZDyH1qQDsFsqaOvvoiJbwipFOB0H2MnPPxm+MdpfBkVT3k73rh6rXc73p9ft/d43vlrxx3H1sfPWHOqG3M24WuS5zY1KuW65m4rZr1S0htSlupXpZUQkHmgkJURtLmtgiJhbOtb8fiEKRtbMvSDg/p7xPcM5XM2S17ZAeaAoVJtntFsObHzPAKcPDW9klOvtsx3uUM1VCy/Zm4JFmXw/Q7ibqb0vMtUapFmZ7YMyVJWEKCtAlB8/lP5ETshAilPWXlOjXLY3RvOv3LLVioMNy0/U31TaXnUf0ncW8dkg8kr2VedpV+I8g9rLclKufq6nJmj1KVqks1RZFpT8m8l1AXxUrXJJI3pQ/7GNYQpmQhCERSEIQCEIQCEIQH/9k=";

      this.logo.render = function (ctx) {
        var gradient = ctx.createLinearGradient(
          0,
          0,
          this.width(),
          0
          );
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, myself.frameColor.toString());
        ctx.fillStyle = MorphicPreferences.isFlat ?
          myself.frameColor.toString() : gradient;
        ctx.fillRect(0, 0, this.width(), this.height());
        if (this.cachedTexture) {
          this.renderCachedTexture(ctx);
        } else if (this.texture) {
          this.renderTexture(this.texture, ctx);
        }
      };

      this.logo.renderCachedTexture = function (ctx) {
        ctx.drawImage(
          this.cachedTexture,
          5,
          Math.round((this.height() - this.cachedTexture.height) / 2)
          );
        this.changed();
      };

      this.logo.mouseClickLeft = function () {
        myself.snapMenu();
      };

      this.logo.color = BLACK;
      this.logo.setExtent(new Point(200, 28)); // dimensions are fixed
      this.add(this.logo);
    };
    var stage = this.parentThatIsA(StageMorph),
      ide = stage.parentThatIsA(IDE_Morph),
      world = stage.parentThatIsA(WorldMorph);
    ide.createLogo();
    ide.createControlBar();
    ide.fixLayout();
  }
);

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
