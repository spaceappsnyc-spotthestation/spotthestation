spotthestation
==============

This app will someday contain a social front end, but for now it is a Rails app which will update the position of a specific Foursquare venue which represents the International Space Station.

Configuration
=============

To update the position of the ISS, you must be able to use the Foursquare2 gem.
The file config/fsq.txt (not in codebase) is a three-line file which contains:

* Foursquare Client API Key
* Foursquare Client API Secret
* Oauth2 token for an authenticated user that can manage the venue (probably a Foursquare superuser)

Once that file exists with valid credentials, you can do these fun things from the Rails console:

* Update the location of the ISS based on data from the HeavensAbove API:

  IssInfo.update_foursquare_venue

* Set the location of the ISS to AlleyNYC, where this app was developed at a hackathon:

  IssInfo.fudge_foursquare_venue

There is a shell script called "runissupdate.sh" which will repeatedly call a rake task that updates the station position.

Users
=====

Users can have a "next_sighting" and "phone_number" attribute set.
While the station position is being updated, it will also see if there are any users who have a phone_number and a next_sighting (UNIX epoch) set.  If the next_sighting is less than five minutes from now, it will text them with the Twilio credentials configured in the lib/SMS.rb file.

These values can be set with a POST, to be used by not-yet-implemented JavaScript calls.

Further Info
============

http://onepagerapp.com/internationalspacestation
