(function(){var affiliatly_code='af-100';var isIE=window.XDomainRequest?true:false;var cross_request=createCrossDomainRequest();var url = 'https://www.affiliatly.com/api_request.php?aid=af-100&t=' + new Date().getTime();var pltf = 'shopify';var request_mode = '';

function createCrossDomainRequest(url, handler)
{
   var request;
   if (isIE)
   {
      request = new window.XDomainRequest()
   }
   else
   {
      request = new XMLHttpRequest()
   }
   return request
}

function callOtherDomain(post_data)
{
   if (cross_request)
   {
      if (isIE)
      {
         cross_request.onload = outputResult;
         cross_request.open("POST", url, true);
         cross_request.send(post_data)
      }
      else
      {
         cross_request.open('POST', url, true);
         cross_request.onreadystatechange = handler;
         cross_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         cross_request.send(post_data)
      }
   }
   return false
}

function handler(evtXHR)
{
   if (cross_request.readyState == 4)
   {
      if (cross_request.status == 200)
      {
         outputResult()
      }
      else
      {}
   }
}

function outputResult()
{
   var response = cross_request.responseText;
   var same_site_cookie = ' SameSite=Lax;';
   if ((request_mode == 'track' || request_mode == 'update') && response.length > 0)
   {
      var cookie_data = response;
      var expires = cookie_data.match(/&duration=([0-9]+)/);
      if (expires != null)
      {
         var now = new Date();
         if (request_mode == 'track')
         {
            var time = now.getTime();
            var expireTime = time + parseInt(expires[1]) * 1000;
            now.setTime(expireTime)
         }
         else
         {
            expireTime = cookie_data.match(/&expire_time=([0-9]+)/);
            now.setTime(parseInt(expireTime[1]) * 1000)
         }
         if (session_cookie == false)
         {
            document.cookie = "affiliatly_v3=" + escape(cookie_data) + "; expires=" + now.toGMTString() + "; " + same_site_cookie + " path=/"
         }
         else
         {
            document.cookie = "affiliatly_v3=" + escape(cookie_data) + "; " + same_site_cookie + " path=/"
         }
      }
   }
   else if (request_mode == 'mark')
   {}
}

function setCookieWithDate()
{
   var cookie_data = getCookie('affiliatly_v3');
	cookie_data = unescape(cookie_data);
	
   var expires = cookie_data.match(/&duration=([0-9]+)/);
   if (expires != null)
   {
      var now = new Date();
      var time = now.getTime();
      var expireTime = time + parseInt(expires[1]) * 1000;
      now.setTime(expireTime);
      document.cookie = "affiliatly_v3=" + escape(cookie_data) + "; expires=" + now.toGMTString() + "; SameSite=Lax; path=/"
   }
}

function getURLParameter(name)
{
   return decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)', 'i').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
}

function getURLHashParameter(name)
{
   return decodeURIComponent((new RegExp('[#]' + name + '=([^&;]+?)(&|#|;|$)', 'i').exec(location.hash) || [, ""])[1].replace(/\+/g, '%20')) || null
}

function getTrackingParameter()
{
   var tracking_parameter = {};
   tracking_parameter.get = {};
   tracking_parameter.hash = {};
   if (getURLParameter('aff') != null)
   {
      tracking_parameter.get.aff = getURLParameter('aff')
   }
   if (getURLParameter('fid') != null)
   {
      tracking_parameter.get.fid = getURLParameter('fid')
   }
   if (getURLParameter('ref') != null)
   {
      tracking_parameter.get.ref = getURLParameter('ref')
   }
   if (getURLParameter('air') != null)
   {
      tracking_parameter.get.air = getURLParameter('air')
   }
   if (getURLParameter('rfsn') != null)
   {
      tracking_parameter.get.rfsn = getURLParameter('rfsn')
   }
   if (getURLParameter('aa') != null)
   {
      tracking_parameter.get.aa = getURLParameter('aa')
   }
   if (getURLParameter('tr') != null)
   {
      tracking_parameter.get.tr = getURLParameter('tr')
   }
   if (getURLParameter('abc') != null)
   {
      tracking_parameter.get.abc = getURLParameter('abc')
   }
   if (getURLHashParameter('aff') != null)
   {
      tracking_parameter.hash.aff = getURLHashParameter('aff')
   }
   if (getURLHashParameter('fid') != null)
   {
      tracking_parameter.hash.fid = getURLHashParameter('fid')
   }
   if (getURLHashParameter('ref') != null)
   {
      tracking_parameter.hash.ref = getURLHashParameter('ref')
   }
   if (getURLHashParameter('air') != null)
   {
      tracking_parameter.hash.air = getURLHashParameter('air')
   }
   if (getURLHashParameter('rfsn') != null)
   {
      tracking_parameter.hash.rfsn = getURLHashParameter('rfsn')
   }
   if (getURLHashParameter('aa') != null)
   {
      tracking_parameter.hash.aa = getURLHashParameter('aa')
   }
   if (getURLHashParameter('tr') != null)
   {
      tracking_parameter.hash.tr = getURLHashParameter('tr')
   }
   if (getURLHashParameter('abc') != null)
   {
      tracking_parameter.hash.abc = getURLHashParameter('abc')
   }
   return tracking_parameter
}

function getUTMParameters()
{
   var utm_parameters = {};
   if (getURLParameter('utm_campaign') != null)
   {
      utm_parameters.campaign = getURLParameter('utm_campaign')
   }
   if (getURLParameter('utm_content') != null)
   {
      utm_parameters.content = getURLParameter('utm_content')
   }
   if (getURLParameter('utm_medium') != null)
   {
      utm_parameters.medium = getURLParameter('utm_medium')
   }
   if (getURLParameter('utm_source') != null)
   {
      utm_parameters.source = getURLParameter('utm_source')
   }
   if (getURLParameter('utm_term') != null)
   {
      utm_parameters.term = getURLParameter('utm_term')
   }
   return utm_parameters
}

function startTracking(id_affiliatly)
{
   request_mode = 'track';
   var data = getCookie('affiliatly_v3');
   var tracking_parameter = getTrackingParameter();
   if ((isEmpty(tracking_parameter.get) == false || isEmpty(tracking_parameter.hash) == false) && data.length == 0)
   {
      var post_data = 'mode=track-v3&id_affiliatly=' + id_affiliatly + '&tracking_parameter=' + JSON.stringify(tracking_parameter) + '&referer=' + document.referrer;
      post_data += "&utm_parameters=" + JSON.stringify(getUTMParameters());
		post_data += '&landing=' + window.location.href;
      if (getURLParameter('qr') != null)
      {
         post_data += '&qr=1'
      }
      callOtherDomain(post_data)
   }
   else if (data.length > 0)
   {}
}
if (typeof String.prototype.trim !== 'function')
{
   String.prototype.trim = function ()
   {
      return this.replace(/^\s+|\s+$/g, '')
   }
}

function get_user_token()
{
   var get_aff_result = getCookie('affiliatly_v3');
   get_aff_result = unescape(get_aff_result);
   
   if (get_aff_result == false || get_aff_result == '')
   {
      return false
   }
   var get_aff_result = get_aff_result.split('&');
   var id_user = get_aff_result[1].split('=');
   id_user = id_user[1];
   var id_hash = get_aff_result[0].split('=');
   id_hash = id_hash[1];
   return '&id_user=' + id_user + '&id_hash=' + id_hash
}

function check_thank_you()
{
   if (typeof (Shopify) !== 'undefined' && typeof (Shopify.Checkout) !== 'undefined' && typeof (Shopify.Checkout.page) !== 'undefined')
   {
      const text = Shopify.Checkout.page;
      const regex = /thank_you/g;
      const found = text.match(regex);
      if (found != null && typeof (Shopify.Checkout.isOrderStatusPage) === 'undefined')
      {
         request_mode = 'update_v3';
         var checkout_token = Shopify.Checkout.token;
         var user_token_string = get_user_token();
         if (user_token_string == false)
         {
            return false
         }
         var post_data = 'mode=update-v3&id_affiliatly=' + affiliatly_code + '&checkout_token=' + checkout_token + user_token_string;
         callOtherDomain(post_data)
      }
   }
}

function check_valid_time()
{}

function getCookie(cname)
{
   var name = cname + "=";
   var ca = document.cookie.split(';');
   for (var i = 0; i < ca.length; i += 1)
   {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0)
      {
         return c.substring(name.length, c.length)
      }
   }
   return ""
}

function isEmpty(obj)
{
   for (var prop in obj)
   {
      if (obj.hasOwnProperty(prop))
      {
         return false
      }
   }
   return true
}
            var session_cookie = false;

var affiliatly_run = false;
var affiliatly_event_set = false;
var affiliatly_id = affiliatly_code.replace(/AF-10/gi, '');

var checked_on_load = 0;
if (window.Shopify !== undefined && window.Shopify.loadFeatures !== undefined) {
    window.Shopify.loadFeatures([{
        name: 'consent-tracking-api',
        version: '0.1'
    }], function(error) {
        if (error) {
            affiliatly_run = true;
            startTracking(affiliatly_code);
            console.log('affiliatly: default.1')
        }
    });
	 
    check_on_load()
} else {
    affiliatly_run = true;
	 console.log('affiliatly: load 2');
    startTracking(affiliatly_code)
}

function check_on_load() {
    if (window.Shopify !== undefined && window.Shopify.customerPrivacy !== undefined) {
	 
	 	// setting event
	 	runTrackingInit();
	 	
		if( typeof window.Shopify.customerPrivacy.userCanBeTracked === 'function' && window.Shopify.customerPrivacy.userCanBeTracked() == true && affiliatly_run == false) {
				affiliatly_run = true;
				session_cookie = false;
				console.log('affiliatly: load 3');
				startTracking(affiliatly_code)
		} else if (affiliatly_run == true) {} else if ( checked_on_load >= 20 ) { return false; } else {
				setTimeout(function() {
				check_on_load();
				checked_on_load += 1;			
		  }, 500)
		}
    }
    else if ( checked_on_load >= 15 && window.Shopify.customerPrivacy == undefined )
    {
        affiliatly_run = true;
        session_cookie = false;
        console.log('affiliatly: load 4');
        startTracking(affiliatly_code)
    } 
	 else if ( checked_on_load >= 16 )
	 {
	 	return false;
	 }
    else {
        setTimeout(function() {
            check_on_load();
				checked_on_load += 1;			
        }, 200)
    }
}

function runTrackingInit() {

	if( affiliatly_event_set == false ) { console.log('affiliatly: running init ' + affiliatly_id ); }

	if (window.Shopify.customerPrivacy !== undefined && affiliatly_event_set == false ) {

		console.log('setting event');
		affiliatly_event_set = true;
		
   	document.addEventListener('visitorConsentCollected', () => {
     		if (window.Shopify.customerPrivacy.userCanBeTracked() == true) {
	  			affiliatly_run = true;
      		console.log('affiliatly: load 5 ' );
       		startTracking(affiliatly_code)
     		}
   	})
  } 
  else 
  {
    if (affiliatly_run == false) {
      //console.log('affiliatly: default.2')
    }
  }
}											
check_thank_you()
})()
		  