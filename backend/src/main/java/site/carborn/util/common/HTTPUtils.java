package site.carborn.util.common;

public class HTTPUtils {
    public static String CONNECTION = "keep-alive";
    public static String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";
    public static String ACCEPT_ENCODING = "gzip, deflate, br";
    public static String ACCEPT_LANGUAGE = "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5";

    public static String getClientOS(String userAgent) {
        String os = "";
        userAgent = userAgent.toLowerCase();
        if (userAgent.contains("windows nt 10.0")) {
            os = "Windows10";
        } else if (userAgent.contains("windows nt 6.1")) {
            os = "Windows7";
        } else if (userAgent.contains("windows nt 6.2") || userAgent.contains("windows nt 6.3")) {
            os = "Windows8";
        } else if (userAgent.contains("windows nt 6.0")) {
            os = "WindowsVista";
        } else if (userAgent.contains("windows nt 5.1")) {
            os = "WindowsXP";
        } else if (userAgent.contains("windows nt 5.0")) {
            os = "Windows2000";
        } else if (userAgent.contains("windows nt 4.0")) {
            os = "WindowsNT";
        } else if (userAgent.contains("windows 98")) {
            os = "Windows98";
        } else if (userAgent.contains("windows 95")) {
            os = "Windows95";
        } else if (userAgent.contains("iphone")) {
            os = "iPhone";
        } else if (userAgent.contains("ipad")) {
            os = "iPad";
        } else if (userAgent.contains("android")) {
            os = "android";
        } else if (userAgent.contains("mac")) {
            os = "mac";
        } else if (userAgent.contains("linux")) {
            os = "Linux";
        } else {
            os = "Other";
        }
        return os;
    }

    public static String getClientBrowser(String userAgent) {
        String browser = "";
        if (userAgent.contains("Trident/7.0")) {
            browser = "ie11";
        } else if (userAgent.contains("MSIE 10")) {
            browser = "ie10";
        } else if (userAgent.contains("MSIE 9")) {
            browser = "ie9";
        } else if (userAgent.contains("MSIE 8")) {
            browser = "ie8";
        } else if (userAgent.contains("Chrome/")) {
            browser = "Chrome";
        } else if (!userAgent.contains("Chrome/") && userAgent.indexOf("Safari/") >= -1) {
            browser = "Safari";
        } else {
            browser = "Firefox";
        }
        return browser;
    }
}
