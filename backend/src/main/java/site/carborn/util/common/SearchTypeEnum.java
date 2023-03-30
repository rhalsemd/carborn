package site.carborn.util.common;

public enum SearchTypeEnum {
    VALUE1(0,"Maker"),
    VALUE2(1,"MODEL_NM"),
    VALUE3(2,"MODEL_YEAR"),
    VALUE4(3,"Content");

    private final int intValue;

    private final String stringValue;

    private SearchTypeEnum(int intValue, String stringValue) {
        this.intValue = intValue;
        this.stringValue = stringValue;
    }
    public int getIntValue() {
        return intValue;
    }
    public String getStringValue() {
        return stringValue;
    }
    public static SearchTypeEnum valueOf(int intValue) {
        for (SearchTypeEnum myEnum : values()) {
            if (myEnum.getIntValue() == intValue) {
                return myEnum;
            }
        }
        throw new IllegalArgumentException("No enum constant with int value " + intValue);
    }
}
