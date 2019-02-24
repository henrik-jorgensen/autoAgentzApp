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
import { Terms } from "../../components/common/Translations";

const SCREEN_WIDTH = Dimensions.get("window").width;

class TermsScreen extends Component {
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
    const strings = Terms(this.props.language);

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Back Button */}
          <View style={[{ top: this.handleBackButtonTop() }, styles.header]}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("terms", {
                  showKeyboard: true
                })
              }
            >
              <Icon name="md-arrow-back" style={{ color: "#fff" }} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View
            style={{ paddingHorizontal: 25, marginTop: this.handleTextTop() }}
          >
            <Text style={styles.h1}>{strings.title}</Text>
            <Text style={styles.effectiveText}>
              {strings.effectiveFrom}
              {strings.effectiveDate}
            </Text>
            <Text style={styles.text}>{strings.termsIntro}</Text>

            {/* Introduction section */}
            <Text style={styles.h2}>{strings.introduction.title}</Text>
            <Text style={styles.text}>{strings.introduction.intro}</Text>
            <Text style={styles.text}>{strings.introduction.content1}</Text>
            <Text style={styles.text}>{strings.introduction.content2}</Text>
            <Text style={styles.text}>{strings.introduction.content3}</Text>
            <Text style={styles.text}>{strings.introduction.content4}</Text>

            {/* Changes to the Agreements section */}
            <Text style={styles.h2}>{strings.changes.title}</Text>
            <Text style={styles.text}>{strings.changes.intro}</Text>
            <Text style={styles.text}>{strings.changes.content1}</Text>
            <Text style={styles.text}>{strings.changes.content2}</Text>

            {/* Using AutoAgentz section */}
            <Text style={styles.h2}>{strings.using.title}</Text>
            <Text style={styles.text}>{strings.using.intro}</Text>

            {/* Our Services and Paid Subscriptions sub-section */}
            <Text style={styles.h3}>{strings.services.title}</Text>
            <Text style={styles.text}>{strings.services.intro}</Text>
            <Text style={styles.text}>{strings.services.content1}</Text>
            <Text style={styles.text}>{strings.services.content2}</Text>

            {/* Prerequisites for subscribing to our Services sub-section */}
            <Text style={styles.h3}>{strings.prerequisites.title}</Text>
            <Text style={styles.text}>{strings.prerequisites.intro}</Text>
            <Text style={styles.text}>{strings.prerequisites.content1}</Text>
            {/* start numbered list */}
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>1.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.prerequisites.list.bullet1}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>2.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.prerequisites.list.bullet2}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>3.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.prerequisites.list.bullet3}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>4.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.prerequisites.list.bullet4}
                </Text>
              </View>
            </View>
            {/* end numbered list */}
            <Text style={styles.text}>{strings.prerequisites.content2}</Text>
            {/* start numbered list */}
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>1.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.prerequisites.list2.bullet1}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>2.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.prerequisites.list2.bullet2}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>3.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.prerequisites.list2.bullet3}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>4.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.prerequisites.list2.bullet4}
                </Text>
              </View>
            </View>
            {/* end numbered list */}

            {/* Trials sub-section */}
            <Text style={styles.h3}>{strings.trials.title}</Text>
            <Text style={styles.text}>{strings.trials.intro}</Text>

            {/* Rights we grant you section */}
            <Text style={styles.h2}>{strings.rightsWeGrant.title}</Text>
            <Text style={styles.text}>{strings.rightsWeGrant.intro}</Text>
            <Text style={styles.text}>{strings.rightsWeGrant.content1}</Text>
            <Text style={styles.text}>{strings.rightsWeGrant.content2}</Text>
            <Text style={styles.text}>{strings.rightsWeGrant.content3}</Text>
            <Text style={styles.text}>{strings.rightsWeGrant.content4}</Text>

            {/* Rights you grant us section */}
            <Text style={styles.h2}>{strings.rightsYouGrant.title}</Text>
            <Text style={styles.text}>{strings.rightsYouGrant.intro}</Text>
            <Text style={styles.text}>{strings.rightsYouGrant.content1}</Text>

            {/* User guidelines section */}
            <Text style={styles.h2}>{strings.userGuidelines.title}</Text>
            <Text style={styles.text}>{strings.userGuidelines.intro}</Text>
            <Text style={styles.text}>{strings.userGuidelines.content1}</Text>
            {/* start numbered list */}
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>1.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.userGuidelines.list.bullet1}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>2.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.userGuidelines.list.bullet2}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>3.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.userGuidelines.list.bullet3}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.numberedList}>
                <Text style={styles.text}>4.</Text>
              </View>
              <View style={styles.bulletText}>
                <Text style={styles.text}>
                  {strings.userGuidelines.list.bullet4}
                </Text>
              </View>
            </View>
            {/* end numbered list */}
            <Text style={styles.text}>{strings.userGuidelines.content2}</Text>

            {/* Service limitations and modifications section */}
            <Text style={styles.h2}>{strings.limitations.title}</Text>
            <Text style={styles.text}>{strings.limitations.intro}</Text>
            <Text style={styles.text}>{strings.limitations.content1}</Text>
            <Text style={styles.text}>{strings.limitations.content2}</Text>
            <Text style={styles.text}>{strings.limitations.content3}</Text>

            {/* Customer support section */}
            <Text style={styles.h2}>{strings.support.title}</Text>
            <Text style={styles.text}>{strings.support.intro}</Text>

            {/* Payments and cancellations section */}
            <Text style={styles.h2}>{strings.payments.title}</Text>
            <Text style={styles.text}>{strings.payments.intro}</Text>
            <Text style={styles.text}>{strings.payments.content1}</Text>
            <Text style={styles.text}>{strings.payments.content2}</Text>
            <Text style={styles.text}>{strings.payments.content3}</Text>
            <Text style={styles.text}>{strings.payments.content4}</Text>
            <Text style={styles.text}>{strings.payments.content5}</Text>

            {/* Term and termination section */}
            <Text style={styles.h2}>{strings.term.title}</Text>
            <Text style={styles.text}>{strings.term.intro}</Text>
            <Text style={styles.text}>{strings.term.content1}</Text>
            <Text style={styles.text}>{strings.term.content2}</Text>
            <Text style={styles.text}>{strings.term.content3}</Text>

            {/* Warranty and disclaimer section */}
            <Text style={styles.h2}>{strings.warranty.title}</Text>
            <Text style={styles.text}>{strings.warranty.intro}</Text>
            <Text style={styles.text}>{strings.warranty.content1}</Text>
            <Text style={styles.text}>{strings.warranty.content2}</Text>
            <Text style={styles.text}>{strings.warranty.content3}</Text>
            <Text style={styles.text}>{strings.warranty.content4}</Text>

            {/* Limitation section */}
            <Text style={styles.h2}>{strings.limitation.title}</Text>
            <Text style={styles.text}>{strings.limitation.intro}</Text>
            <Text style={styles.text}>{strings.limitation.content1}</Text>
            <Text style={styles.text}>{strings.limitation.content2}</Text>
            <Text style={styles.text}>{strings.limitation.content3}</Text>

            {/* Third party rights section */}
            <Text style={styles.h2}>{strings.thirdParty.title}</Text>
            <Text style={styles.text}>{strings.thirdParty.intro}</Text>

            {/* Entire agreement section */}
            <Text style={styles.h2}>{strings.entireAgreement.title}</Text>
            <Text style={styles.text}>{strings.entireAgreement.intro}</Text>
            <Text style={styles.text}>{strings.entireAgreement.content1}</Text>

            {/* Severability and waiver section */}
            <Text style={styles.h2}>{strings.severability.title}</Text>
            <Text style={styles.text}>{strings.severability.intro}</Text>
            <Text style={styles.text}>{strings.severability.content1}</Text>

            {/* Assignment section */}
            <Text style={styles.h2}>{strings.assignment.title}</Text>
            <Text style={styles.text}>{strings.assignment.intro}</Text>

            {/* Indemnification section */}
            <Text style={styles.h2}>{strings.indemnification.title}</Text>
            <Text style={styles.text}>{strings.indemnification.intro}</Text>

            {/* Choice of law, mandatory arbitration and venue section */}
            <Text style={styles.h2}>{strings.choiceOfLaw}</Text>

            {/* Governing law / Jurisdiction sub-section */}
            <Text style={styles.h3}>{strings.governingLaw.title}</Text>
            <Text style={styles.text}>{strings.governingLaw.intro}</Text>
            <Text style={styles.text}>{strings.governingLaw.content1}</Text>
            <Text style={styles.text}>{strings.governingLaw.content2}</Text>

            {/* Class action waiver sub-section */}
            <Text style={styles.h3}>{strings.classAction.title}</Text>
            <Text style={styles.text}>{strings.classAction.intro}</Text>

            {/* Contact section */}
            <Text style={styles.h2}>{strings.contact.title}</Text>
            <Text style={styles.text}>{strings.contact.intro}</Text>
            <Text style={styles.text}>{strings.contact.content1}</Text>
            <Text style={styles.text}>{strings.contact.content2}</Text>
            <Text style={styles.text}>{strings.contact.companyName}</Text>
            <Text style={styles.address}>{strings.contact.street}</Text>
            <Text style={styles.address}>{strings.contact.postcodeCity}</Text>
            <Text style={styles.address}>{strings.contact.country}</Text>
            <Text style={styles.text}>{strings.contact.vatNo}</Text>
            <Text style={styles.text}> </Text>
            <Text style={styles.text}>© {strings.contact.copyright}</Text>

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
  effectiveText: {
    fontSize: 12,
    color: "#666",
    paddingTop: 2
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
)(TermsScreen);
