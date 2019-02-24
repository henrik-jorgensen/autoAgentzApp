import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import { Icon } from "native-base";
import { connect } from "react-redux";

import * as actions from "../../redux/actions";
import { PrivacyPolicy } from "../../components/common/Translations";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class PrivacyPolicyScreen extends Component {
  static navigationOptions = {
    header: null
  };

  handleBackButtonTop = () => {
    if (Platform.OS === "ios") {
      return 20;
    } else {
      return 45;
    }
  };

  handleTextTop = () => {
    if (Platform.OS === "ios") {
      return 75;
    } else {
      return 90;
    }
  };

  render() {
    // get strings in correct language
    const strings = PrivacyPolicy(this.props.language);

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Back Button */}
          <View style={[{ top: this.handleBackButtonTop() }, styles.header]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("terms")}
            >
              <Icon name="md-arrow-back" style={{ color: "#fff" }} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View
            style={{ paddingHorizontal: 25, marginTop: this.handleTextTop() }}
          >
            <Text style={styles.h1}>{strings.title}</Text>
            <Text style={styles.modifiedText}>
              {strings.lastModified}
              {strings.lastModifiedDate}
            </Text>
            <Text style={styles.text}>{strings.intro}</Text>

            {/* Personal data processing section */}
            <Text style={styles.h2}>{strings.pdp.title}</Text>
            <Text style={styles.h3}>{strings.pdp.whatIsPersonalData}</Text>
            <Text style={styles.text}>
              {strings.pdp.whatIsPersonalDataExplanation}
            </Text>

            {/* General principles for personal data processing sub-section */}
            <Text style={styles.h3}>{strings.pdp.generalPrinciplesForPdp}</Text>
            <Text style={styles.text}>
              {strings.pdp.generalPrinciplesIntro}
            </Text>

            {/* bullet list */}
            <View style={styles.row}>
              <View style={styles.bulletList}>
                <Text style={styles.text}>{"\u2022"}</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.pdp.list.bullet1}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.bulletList}>
                <Text style={styles.text}>{"\u2022"}</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.pdp.list.bullet2}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.bulletList}>
                <Text style={styles.text}>{"\u2022"}</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.pdp.list.bullet3}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.bulletList}>
                <Text style={styles.text}>{"\u2022"}</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.pdp.list.bullet4}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.bulletList}>
                <Text style={styles.text}>{"\u2022"}</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.pdp.list.bullet5}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.bulletList}>
                <Text style={styles.text}>{"\u2022"}</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.pdp.list.bullet6}</Text>
              </View>
            </View>
            {/* end bullet list*/}

            <Text style={styles.text}>{strings.pdp.gdprReference}</Text>

            {/* Personal data we collect and process sub-section */}
            <Text style={styles.h3}>{strings.pdwc.title}</Text>
            <Text style={styles.text}>{strings.pdwc.intro}</Text>
            {/* numbered list */}
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>1.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.pdwc.list.bullet1}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>2.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.pdwc.list.bullet2}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>3.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.pdwc.list.bullet3}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>4.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.pdwc.list.bullet4}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>5.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.pdwc.list.bullet5}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>6.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.pdwc.list.bullet6}</Text>
              </View>
            </View>
            {/* end numbered list */}

            {/* How we use your personal data sub-section */}
            <Text style={styles.h3}>{strings.hwupd.title}</Text>
            <Text style={styles.text}>{strings.hwupd.intro}</Text>
            {/* numbered list */}
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>1.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.hwupd.list.bullet1}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>2.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.hwupd.list.bullet2}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>3.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.hwupd.list.bullet3}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>4.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.hwupd.list.bullet4}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>5.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.hwupd.list.bullet5}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>6.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.hwupd.list.bullet6}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>7.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.hwupd.list.bullet7}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>8.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>{strings.hwupd.list.bullet8}</Text>
              </View>
            </View>
            {/* end numbered list */}
            <Text style={styles.text}>{strings.hwupd.end}</Text>

            {/* Where we store and process your personal data sub-section */}
            <Text style={styles.h3}>{strings.sppd.title}</Text>
            <Text style={styles.text}>{strings.sppd.intro}</Text>

            {/* Disclosure of your personal data to third parties sub-section */}
            <Text style={styles.h3}>{strings.disclosure.title}</Text>
            <Text style={styles.text}>{strings.disclosure.intro}</Text>
            <Text style={styles.text}>{strings.disclosure.content}</Text>
            {/* numbered list */}
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>1.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.disclosure.list.bullet1}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>2.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.disclosure.list.bullet2}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>3.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.disclosure.list.bullet3}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>4.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.disclosure.list.bullet4}
                </Text>
              </View>
            </View>
            {/* end numbered list */}
            <Text style={styles.text}>{strings.disclosure.end}</Text>

            {/* Retention of your personal data sub-section */}
            <Text style={styles.h3}>{strings.retention.title}</Text>
            <Text style={styles.text}>{strings.retention.intro}</Text>
            <Text style={styles.text}>{strings.retention.content1}</Text>
            <Text style={styles.text}>{strings.retention.content2}</Text>
            <Text style={styles.text}>{strings.retention.content3}</Text>
            <Text style={styles.text}>{strings.retention.content4}</Text>
            <Text style={styles.text}>{strings.retention.content5}</Text>

            {/* Cookies sub-section */}
            <Text style={styles.h3}>{strings.cookies.title}</Text>
            <Text style={styles.text}>{strings.cookies.intro}</Text>
            <Text style={styles.text}>{strings.cookies.content1}</Text>
            <Text style={styles.text}>{strings.cookies.content2}</Text>
            <Text style={styles.text}>{strings.cookies.content3}</Text>
            <Text style={styles.text}>{strings.cookies.content4}</Text>

            {/* Responsible for processing sub-section */}
            <Text style={styles.h3}>{strings.responsible.title}</Text>
            <Text style={styles.text}>{strings.responsible.intro}</Text>

            {/* Your Rights section */}
            <Text style={styles.h2}>{strings.yourRights}</Text>

            {/* Right to access personal data and data portability sub-section */}
            <Text style={styles.h3}>{strings.rightToAccess.title}</Text>
            <Text style={styles.text}>{strings.rightToAccess.intro}</Text>
            <Text style={styles.text}>{strings.rightToAccess.content1}</Text>

            {/* Right to erasure sub-section */}
            <Text style={styles.h3}>{strings.rightToErasure.title}</Text>
            <Text style={styles.text}>{strings.rightToErasure.intro}</Text>
            <Text style={styles.text}>{strings.rightToErasure.content1}</Text>
            <Text style={styles.text}>{strings.rightToErasure.content2}</Text>

            {/* Right to withdraw your consent sub-section */}
            <Text style={styles.h3}>{strings.rightToWithdraw.title}</Text>
            <Text style={styles.text}>{strings.rightToWithdraw.intro}</Text>
            <Text style={styles.text}>{strings.rightToWithdraw.content1}</Text>
            <Text style={styles.text}>{strings.rightToWithdraw.content2}</Text>

            {/* Right to restriction of processing and right to object sub-section */}
            <Text style={styles.h3}>{strings.rightToRestriction.title}</Text>
            <Text style={styles.text}>{strings.rightToRestriction.intro}</Text>
            <Text style={styles.text}>
              {strings.rightToRestriction.content1}
            </Text>
            <Text style={styles.text}>
              {strings.rightToRestriction.content2}
            </Text>

            {/* Right to rectification sub-section */}
            <Text style={styles.h3}>{strings.rightToRectification.title}</Text>
            <Text style={styles.text}>
              {strings.rightToRectification.intro}
            </Text>

            {/* Right to complain sub-section */}
            <Text style={styles.h3}>{strings.rightToComplain.title}</Text>
            <Text style={styles.text}>{strings.rightToComplain.intro}</Text>
            <Text style={styles.text}>{strings.rightToComplain.content1}</Text>
            <Text style={styles.text}>{strings.rightToComplain.content2}</Text>

            {/* Miscellaneous section */}
            <Text style={styles.h2}>{strings.miscellaneous}</Text>

            {/* Third-party websites, plug-ins and services sub-section */}
            <Text style={styles.h3}>{strings.thirdParty.title}</Text>
            <Text style={styles.text}>{strings.thirdParty.intro}</Text>
            <Text style={styles.text}>{strings.thirdParty.content1}</Text>

            {/* Data security sub-section */}
            <Text style={styles.h3}>{strings.dataSecurity.title}</Text>
            <Text style={styles.text}>{strings.dataSecurity.intro}</Text>
            <Text style={styles.text}>{strings.dataSecurity.content1}</Text>
            <Text style={styles.text}>{strings.dataSecurity.content2}</Text>
            <Text style={styles.text}>{strings.dataSecurity.content3}</Text>

            {/* Changes to our privacy policy sub-section */}
            <Text style={styles.h3}>{strings.changes.title}</Text>
            <Text style={styles.text}>{strings.changes.intro}</Text>
            <Text style={styles.text}>{strings.changes.content1}</Text>

            {/* Contact details sub-section */}
            <Text style={styles.h3}>{strings.contact.title}</Text>
            <Text style={styles.text}>{strings.contact.intro}</Text>
            <Text style={styles.text}>{strings.contact.company}</Text>
            <Text style={styles.address}>{strings.contact.street}</Text>
            <Text style={styles.address}>{strings.contact.postcodeCity}</Text>
            <Text style={styles.address}>{strings.contact.country}</Text>
            <Text style={styles.text}>{strings.contact.end}</Text>

            <Text style={styles.text}> </Text>
          </View>
        </ScrollView>

        {/* Go Back Button */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("terms")}
            style={styles.goBackButton}
          >
            <Text style={{ fontSize: 28, color: "#fff" }}>
              <Icon
                name="md-arrow-back"
                style={{ color: "#fff", fontSize: 28 }}
              />
              {"  "}
              {this.props.strings.goBack}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2b"
  },
  scrollView: {
    marginBottom: 70
  },
  buttonRow: {
    flexDirection: "column",
    paddingHorizontal: 0,
    alignItems: "stretch",
    justifyContent: "flex-end",
    flex: 1
  },
  goBackButton: {
    height: 70,
    backgroundColor: "#4BB543",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    position: "absolute",
    height: 60,
    width: 60,
    left: 25,
    zIndex: 100
  },
  icon: {
    color: "#fff",
    fontSize: 34
  },
  h1: {
    fontSize: 24,
    color: "#fff"
  },
  h2: {
    fontSize: 22,
    color: "#fff",
    paddingTop: 18
  },
  h3: {
    fontSize: 18,
    color: "#fff",
    paddingTop: 14
  },
  text: {
    fontSize: 14,
    color: "#fff",
    paddingTop: 7
  },
  address: {
    fontSize: 14,
    color: "#fff",
    paddingTop: 0
  },
  modifiedText: {
    fontSize: 12,
    color: "#666"
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flex: 1
  },
  bulletList: {
    width: 14
  },
  numberedList: {
    width: 18
  },
  bulletText: {
    flex: 1
  }
});

const mapStateToProps = state => {
  const { language, strings } = state.locale;

  return { language, strings };
};

export default connect(
  mapStateToProps,
  actions
)(PrivacyPolicyScreen);
