# android集成原生模块

[TOC]


## 集成(必须)
1、 tip1: 创建一个原生模块， 继承自 ReactContextBaseJavaModule 的java类，可以实现一些 JS 所需的功能. eg: setBadge

2、 tip2: ReactContextBaseJavaModule要求派生类实现getName方法。
       这个函数用于返回一个字符串名字，这个名字在JavaScript端标记这个模块。这里我们把这个模块叫做 BadgeAndroid.
       这样就可以在JavaScript中通过React.NativeModules.BadgeAndroid 访问到这个模块。
       译注：模块名前的RCT前缀会被自动移除。所以如果返回的字符串为"RCTToastAndroid"，在JavaScript端依然通过React.NativeModules.ToastAndroid访问到这个模块。

3、tip3: 要导出一个方法给JavaScript使用，Java方法需要使用注解@ReactMethod。
       方法的返回类型必须为void。React Native的跨语言访问是异步进行的，所以想要给JavaScript返回一个值的唯一办法是使用回调函数或者发送事件（参见下文的描述）。



```java
package me.jhen.react;

import android.content.Context;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import me.leolin.shortcutbadger.ShortcutBadger;

// tip1: 创建一个原生模块， 继承自 ReactContextBaseJavaModule 的java类，可以实现一些 JS 所需的功能. eg: setBadge
public class BadgeModule extends ReactContextBaseJavaModule {

  private Context context;

  public BadgeModule(ReactApplicationContext reactContext) {
    super(reactContext);

    this.context = (Context) reactContext;
  }

// tip2: ReactContextBaseJavaModule要求派生类实现getName方法。
//       这个函数用于返回一个字符串名字，这个名字在JavaScript端标记这个模块。这里我们把这个模块叫做 BadgeAndroid.
//       这样就可以在JavaScript中通过React.NativeModules.BadgeAndroid 访问到这个模块。

// 译注：模块名前的RCT前缀会被自动移除。
//       所以如果返回的字符串为"RCTToastAndroid"，在JavaScript端依然通过React.NativeModules.ToastAndroid访问到这个模块。
  @Override
  public String getName() {
    return "BadgeAndroid";
  }
  
// tips:  一个可选的方法getContants返回了需要导出给JavaScript使用的常量。它并不一定需要实现，但在定义一些可以被JavaScript同步访问到的预定义的值时非常有用。

 @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

// tip3: 要导出一个方法给JavaScript使用，Java方法需要使用注解@ReactMethod。
//       方法的返回类型必须为void。React Native的跨语言访问是异步进行的，所以想要给JavaScript返回一个值的唯一办法是使用回调函数或者发送事件（参见下文的描述）。

  @ReactMethod
  public void setBadge(int number) {
    ShortcutBadger.applyCount(getReactApplicationContext(), number);
  }
}

```


4、 tip4: 注册模块: 在Java这边要做的最后一件事就是注册这个模块。我们需要在应用的Package类的createNativeModules方法中添加这个模块。如果模块没有被注册，它也无法在JavaScript中被访问到。
       这个package需要在 MainApplication.java 文件的getPackages方法中提供。 android/app/src/main/java/com/your-app-name/MainApplication.java.
       getPackages: new BadgePackage()
       

```java
package me.jhen.react;


import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;


import java.util.*;  // 等同于 import java.util.ArrayList;  // ++import java.util.Collections; // ++import java.util.List;
public class BadgePackage implements ReactPackage {

// tip4: 注册模块: 在Java这边要做的最后一件事就是注册这个模块。我们需要在应用的Package类的createNativeModules方法中添加这个模块。如果模块没有被注册，它也无法在JavaScript中被访问到。
//       这个package需要在 MainApplication.java 文件的getPackages方法中提供。 android/app/src/main/java/com/your-app-name/MainApplication.java.
//       getPackages: new BadgePackage()


  @Override
  public List<NativeModule> createNativeModules( ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new BadgeModule(reactContext));
    return modules;
  }

  @Override
  public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList();
  }
}
```


### 集成后的配置1
 封装给RN调用的api（原生模块的相关接口）：
 1. 添加repositories: 在 android/build.gradle 中（to your build script ）
    注意是不是在buildscript 下的 repositories
    添加 dependencies： 在android/app/build.gradle
    如果是个file:                    compile files('libs/open_sdk_r5756.jar')
    否则：                           compile "me.leolin:ShortcutBadger:1.1.13@aar"


### 集成后的配置2: 引用他人的项目
 
 1. 配置项目路径 （ 如果不是project，跳过 ）： android/settings.gradle
    include ':RCTWeChat'
    project(':RCTWeChat').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-wechat/android')

 引用他人的项目：
 
 2. 添加 dependencies： 在android/app/build.gradle
    如果是个project（注意操作2）:      compile project(':react-native-device-info')
    暂时不确定原生集成file，是在哪个 build.gradle 下配置 dependencies ????

 3. 避免混淆类 （ maybe~ ）
    1、# -dontwarn 包名+类名.**  取消掉warning
    2、# -keep class 包名+类名{*;}或者包名.**{*;}   避免混淆





## 回调函数

## 参考
1. [原生模块](http://reactnative.cn/docs/0.41/native-modules-android.html)