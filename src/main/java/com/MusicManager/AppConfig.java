package com.MusicManager;

import com.MusicManager.controller.ControllerConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(ControllerConfig.class)
public class AppConfig {
}
